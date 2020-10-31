import React, { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FeatureCollection } from "geojson";
import { useMediaQuery } from "@material-ui/core";

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { Zoom } from "./Zoom";
import { OfflineIndicator } from "./OfflineIndicator";
import { TopLeftContainer } from "./TopLeftContainer";
import { TimeNav } from "./TimeNav";
import { WelcomeStepsModal } from "./WelcomeStepsModal/WelcomeStepsModal";
import { WelcomeInfo } from "./WelcomeInfo";
import { WelcomeInfoButton } from "./WelcomeInfoButton";
import { GLMap } from "./GLMap";
import { Legend } from "./Legend";
import { Settings } from "./Settings";
import { config } from "app-config/index";
import { welcomeStepsConfig } from "./WelcomeStepsModal/welcomeStepsConfig";
import { FeatureInfo } from "./FeatureInfo";
import { flyTo } from "../state/thunks/flyTo";

const useStyles = makeStyles((theme) => ({
  main: {
    "height": "100%",
    "width": "100%",
    "position": "absolute",
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    "z-index": 0,
  },
  currentInfo: {
    "position": "absolute",
    "top": "64px",
    "right": 0,
    "margin": theme.spacing(2),
    "zIndex": 1090,
    "textShadow": `
      -1px -1px 0 rgba(0,0,0,0.36),
      1px -1px 0 rgba(0,0,0,0.36),
      -1px 1px 0 rgba(0,0,0,0.36),
      1px 1px 0 rgba(0,0,0,0.36);
    `,
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1, 2),
    },
    "& h2": {
      fontWeight: 600,
    },
    "& h6": {
      fontWeight: 600,
    },
    "textAlign": "right",
    "touchAction": "none",
  },
}));

let viewPortEventCounter = 0;

// Note: React hooks ref diffing workaround
let previousMapRef = null;
let jumpedToLastFeatureOnce = false;

export const CovMap = () => {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const urlParams = useParams<{ subPage?: string }>();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:600px)");
  // const position = useSelector((state: State) => state.app.currentPosition); // TODO
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const datasetFound = useSelector((state: State) => state.app.datasetFound);
  const currentFeature = useSelector((state: State) => state.app.currentFeature);
  const currentFeaturePropId = useSelector((state: State) => state.app.currentFeaturePropId);
  const mappedSets = useSelector((state: State) => state.app.mappedSets);
  const currentMappable = useSelector((state: State) => state.app.currentMappable);
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const userPostalCode = useSelector((state: State) => state.app.userPostalCode);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapRef = createRef<any>();
  const visual = config.visuals[currentVisual];
  const { t } = useTranslation(["common"]);

  const handleMapBusy = () => {
    dispatch(AppApi.pushLoading("map-busy"));
  };

  const handleMapIdleOrRemoved = () => {
    dispatch(AppApi.popLoading("map-busy"));
  };

  const isCurrentPageWelcomeScreen = welcomeStepsConfig.find(({ name }) => name === urlParams.subPage) !== undefined;

  useEffect(() => {
    if (userPostalCode === null && !isCurrentPageWelcomeScreen) {
      history.push(welcomeStepsConfig[0].name);
    }
  }, [userPostalCode, urlParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (viewPortEventCounter > 1000) {
        clearInterval(interval);
      }

      dispatch(AppApi.setViewportEventCount(viewPortEventCounter));
    }, 10000);
  }, []);

  // Note: This is to ensure the event listeners are attached only once,
  // because react useEffect fires multiple times, even though mapRef.current did not change
  const changedMapRef = previousMapRef !== mapRef.current;
  useEffect(() => {
    previousMapRef = mapRef.current;
  }, [mapRef]);
  useEffect(
    function () {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.on("dataloading", handleMapBusy);
        map.on("idle", handleMapIdleOrRemoved);
        map.once("remove", handleMapIdleOrRemoved);
        config.imageIcons?.map(({ id, url, pixelRatio, sdf }) => {
          if (map.hasImage(id)) {
            return;
          }
          map.loadImage(url, (err, data) => {
            if (err) {
              throw err;
            }
            map.addImage(id, data, { pixelRatio, sdf });
          });
        });
      }

      return () => {
        if (mapRef.current) {
          const map = mapRef.current.getMap();
          map.off("dataloading", handleMapBusy);
          map.off("idle", handleMapIdleOrRemoved);
          config.imageIcons?.map(({ id }) => {
            map.removeImage(id);
          });
        }
      };
    },
    [changedMapRef],
  );

  const resetFeature = (feature) => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.setFeatureState({ source: feature.source, id: feature.id }, { hover: false });
    }
  };

  useEffect(() => {
    if (!mapLoaded) {
      return;
    }
    if (currentFeature.previousFeature) {
      resetFeature(currentFeature.previousFeature);
    }
    if (currentFeature.feature) {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.setFeatureState({ source: currentFeature.feature.source, id: currentFeature.feature.id }, { hover: true });
      }
    }
  }, [currentFeature]);

  const onViewportChange = (newViewPort) => {
    viewPortEventCounter += 1;

    // Note: Explicitly not spreading stateViewport in here,
    // because it blows up with the transition interpolators
    dispatch(AppApi.setViewport(newViewPort));
  };

  const mappingLayers = Object.keys(visual.mappings);
  const handleMapClick = (pointerEvent, stateViewport) => {
    const { features } = pointerEvent;
    if (features.length > 0) {
      /* handle multiple features. this happens when a street or text is clicked */
      let glFeature;
      if (features.length > 1) {
        // find out target features from index.ts
        const layers = config.visuals.covmap.layers;
        if (!layers || !layers.length) return;

        const clickableLayer = layers.filter((layer) => layer.clickable); // get all clickable layers
        if (!clickableLayer.length) return;

        glFeature = features.filter((feature) =>
          clickableLayer.some((layer) => feature.layer && feature.layer.id === layer.id),
        );
        if (!glFeature.length) return;
      } else {
        glFeature = features;
      }

      if (mapRef.current) {
        if (!mappingLayers.includes(glFeature[0].source)) {
          return;
        }
      }

      dispatch(AppApi.setCurrentFeature(glFeature[0], pointerEvent.lngLat));

      if (stateViewport.zoom > 7) {
        dispatch(flyTo(pointerEvent.lngLat[0], pointerEvent.lngLat[1]));
      }
    }
  };

  /**
   * Takes the stored last select feature and sets it to current feature,
   * to show the feature info last viewed after a reload.
   */
  useEffect(() => {
    if (jumpedToLastFeatureOnce) {
      return;
    }

    if (mapRef.current && currentVisual && mappedSets[currentVisual] && currentFeaturePropId) {
      const mapset = mappedSets[currentVisual][currentFeaturePropId.mappingId];
      if (mapset) {
        const featurePropKey = config.visuals[currentVisual].mappings[currentFeaturePropId.mappingId].featurePropKey;
        const feature = (mapset.geo as FeatureCollection).features.find(
          ({ properties }) => (properties || {})[featurePropKey] === currentFeaturePropId.featurePropId,
        );
        const map = mapRef.current.getMap();
        const lngLat = currentFeaturePropId.lngLat;

        map.once("idle", (evt) => {
          dispatch(
            AppApi.setCurrentFeature(
              {
                ...feature,
                id: currentFeaturePropId.featureId,
                source: currentFeaturePropId.mappingId,
              },
              lngLat,
            ),
          );

          if (lngLat) {
            dispatch(flyTo(lngLat[0], lngLat[1]));
          }
        });

        jumpedToLastFeatureOnce = true;
      }
    }
  }, [currentVisual, mappedSets, mapRef]);

  const handleMapLoaded = () => {
    setMapLoaded(true);
  };

  return (
    <div id="mapParentDiv" className={classes.main}>
      <div className={classes.currentInfo}>
        {/*<Typography variant="h2" color="primary">{visual.name}</Typography>*/}
        <Typography variant="h2" color="primary">
          {typeof currentMappable.title === "function" ? currentMappable.title(t) : currentMappable.title}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {typeof visual.dateFormat === "function"
            ? visual.dateFormat(t, { date: currentDate.toDate() })
            : moment(currentDate).format(visual.dateFormat)}
        </Typography>
      </div>
      {config.showSettings === false ? null : <Settings />}
      {!isMobile && <Zoom />}
      <TopLeftContainer>
        {visual.InfoComponent ? <WelcomeInfoButton /> : null}
        <OfflineIndicator />
      </TopLeftContainer>
      {visual.InfoComponent ? <WelcomeInfo /> : null}
      <GLMap mapRef={mapRef} onMapClick={handleMapClick} onViewportChange={onViewportChange} onLoad={handleMapLoaded} />
      <FeatureInfo />
      {config.showTimeNavigation === false ? null : <TimeNav />}
      <Legend />
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={!datasetFound}
        style={{
          zIndex: 1190,
          touchAction: "none",
          position: "absolute",
        }}
        container={() => document.getElementById("mapParentDiv")}
        BackdropProps={{ style: { position: "absolute" } }}
      >
        <DialogTitle
          id="simple-dialog-title"
          style={{
            touchAction: "none",
          }}
        >
          {t("no data for selected timeframe")}
        </DialogTitle>
      </Dialog>
      <WelcomeStepsModal subPage={urlParams.subPage} />
    </div>
  );
};
