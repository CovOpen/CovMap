import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function zoomIn() {
  return async (dispatch: ReduxDispatch, getState) => {
    const { default: FlyToInterpolator } = await import(
      /* webpackChunkName: "mapgl" */ "react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator"
    );
    const state = getState().app;

    const viewport = {
      ...state.viewport,
      zoom: state.viewport.zoom + 0.75,
      transitionDuration: 400,
      transitionInterpolator: new FlyToInterpolator(),
    };

    dispatch(AppApi.setViewport(viewport));
  };
}

export function zoomOut() {
  return async (dispatch: ReduxDispatch, getState) => {
    const { default: FlyToInterpolator } = await import(
      /* webpackChunkName: "mapgl" */ "react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator"
    );
    const state = getState().app;

    const viewport = {
      ...state.viewport,
      zoom: state.viewport.zoom - 0.75,
      transitionDuration: 400,
      transitionInterpolator: new FlyToInterpolator(),
    };

    dispatch(AppApi.setViewport(viewport));
  };
}
