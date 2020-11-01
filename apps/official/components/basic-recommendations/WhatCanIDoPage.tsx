// frameworks...
import React, { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Grid,
    Typography,
    CircularProgress,
 } from "@material-ui/core";

// base app...
import { formatUTCDate } from "../../../../src/lib/formatUTCDate";
import { State } from "../../../../src/state";

// apps/official...
import NoContactsIcon from "../../static/images/no-contacts.svg";
import DistanceIcon from "../../static/images/distance.svg";
import HygieneIcon from "../../static/images/hand-washing.svg";
import MaskIcon from "../../static/images/mask.svg";
import VentilationIcon from "../../static/images/fresh-air.svg";
import RegionalIcon from "../../static/images/checklist.svg";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { MeasureSection } from './MeasureSection';
import { CountyTeaser } from './CountyTeaser';

// FOR TRANSLATION -->
const TITLE = "Wie kann ich mich verhalten?";
const SUBTITLE_MEASURES = "4 Massnahmen mit großer Wirkung";
const SUBTITLE_FINALTEASER = "Gemeinsam weiter";
const TEASER_1 = "In den letzten Monaten konnte immer wieder gezeigt werden, dass ganz einfache Maßnahmen, die von jedem umgesetzt werden können, sehr viel Wirkung haben. ";
const TEASER_2 = "Die Pandemie ist noch nicht vorbei und wir alle haben das Ziel die Pandemie soweit es geht einzudämmen und natürlich Risikogruppen zu schützen.";
const TEASER_3 = "Besonders die bevorstehende kalte Jahreszeit, in der wir uns überwiegend in geschlossen Räumen aufhalten, stellt eine Herausforderung dar. Es kommt jetzt auf Dich, auf uns, auf jeden Einzelnen an!";
const CONTACT_HEADLINE = "Kontakte reduzieren";
const CONTACT_TEXT = "Kontakte reduzieren ist eine der wirkungsvollsten Maßnahmen. Das Virus wird von Mensch-zu-Mensch übertragen. Wenn man sich nicht trifft, kann das Virus also nicht übertragen werden. Greife zum Telefonhörer, halte eine Videokonferenz und arbeite von zu Hause, wann immer dies möglich ist. So schwer es auch fällt, Kontakte minimieren schützt und hilft uns allen, vor allem in Risikogebieten. Seid dabei und helft mit!";
const DISTANCE_HEADLINE = "Abstand halten";
const DISTANCE_TEXT = "Falls Du Kontakt zu einer Person hast, dann halte einen Abstand von mindestens 1.5 Metern. Je mehr Abstand, umso besser.";
const MASK_HEADLINE = "Maske tragen";
const MASK_TEXT = "Wenn Du infiziert bist und Du eine Alltagsmaske trägst, verringert sich das Risiko, dass Du andere Personen ansteckst. Sind Kontakte nicht vermeidbar, kann das Tragen einer Maske also sowohl Dich, als auch Dein Gegenüber schützen.";
const VENTILATION_HEADLINE = "Regelmäßig lüften";
const VENTILATION_TEXT = "Das Virus kann über die Luft übertragen werden. Wenn Du Dich mit anderen Personen triffst, dann tue dies am besten an der frischen Luft.\nFalls Du Dich doch in einen geschlossenen Raum begeben musst, dann sorge für eine gute Luftzirkulation, indem Du Fenster öffnest und gut lüftest.";
const HYGIENE_HEADLINE = "Hygienemaßnahmen";
const HYGIENE_TEXT = "Hygienemaßnahmen können Infektionen verringern. Das Verwenden von Desinfektionsmitteln und das Händewaschen können dazu beitragen, Infektionen zu verhindern, wenn Du Dinge angefasst hast, die potentiell mit dem Virus kontaminiert sind.";
// <-- FOR TRANSLATION

const CONTACT_COLOR = "#cc66ff";
const DISTANCE_COLOR = "#ff9966";
const MASK_COLOR = "#33ccff";
const VENTILATION_COLOR = "#ffd480";
const HYGIENE_COLOR = "#00BFFF";

const useStyles = makeStyles({
    subHeader: {
        textAlign: "left",
        fontWeight: "bold",
    },
});

const ContactSection: React.FC<{}> = () => <MeasureSection
    title={CONTACT_HEADLINE}
    description={CONTACT_TEXT}
    backgroundColor={CONTACT_COLOR}
    icon={NoContactsIcon}
/>;

const DistanceSection: React.FC<{}> = () => <MeasureSection
    title={DISTANCE_HEADLINE}
    description={DISTANCE_TEXT}
    backgroundColor={DISTANCE_COLOR}
    icon={DistanceIcon}
/>;

const MaskSection: React.FC<{}> = () => <MeasureSection
    title={MASK_HEADLINE}
    description={MASK_TEXT}
    backgroundColor={MASK_COLOR}
    icon={MaskIcon}
/>;

const HygieneSection: React.FC<{}> = () => <MeasureSection
    title={HYGIENE_HEADLINE}
    description={HYGIENE_TEXT}
    backgroundColor={HYGIENE_COLOR}
    icon={HygieneIcon}
/>;


const VentilationSection: React.FC<{}> = () => <MeasureSection
    title={VENTILATION_HEADLINE}
    description={VENTILATION_TEXT}
    backgroundColor={VENTILATION_COLOR}
    frontColor="#000000"
    icon={VentilationIcon}
/>;

interface DistrictData {
    county: string;
    howToBehaveUrl: string;
  }
  
  function loadDistrictData(location): DistrictData | undefined {
    const id = new URLSearchParams(location?.search).get("IdDistrict");
    const dataSets = useSelector((state: State) => state.app.datasets);
    const currentDate = useSelector((state: State) => state.app.currentDate);
  
    const dateKey = formatUTCDate(currentDate);
    const set = dataSets.get(`${dateKey}-contact-index`);
    const current = set?.data[id as string];
  
    if (current === undefined) {
      return undefined;
    }
  
    return {
      county: `${current.locationName}`,
      howToBehaveUrl: `${current.howToBehaveUrl}`,
    };
  }

export const WhatCanIDoPage: React.FC<{}> = () => {

    const classes = useStyles();
    const location = useLocation();
    const districtData = loadDistrictData(location);

    return (
        <>
        <main className="sections">
            <section>
                <NavigationTitle title={TITLE} backToExpandedFeatureInfo={true} />
            </section>
            <section>
                <Typography variant="h3" className={classes.subHeader}>
                    {TEASER_1}
                </Typography>
            </section>
            <section>
                <Typography variant="h2">
                    {SUBTITLE_MEASURES}
                </Typography>                
            </section>
            <section>                
                <Grid container direction="column">                    
                    <Grid item>
                        <ContactSection/>
                    </Grid>
                    <Grid item>
                        <DistanceSection/>
                    </Grid>
                    <Grid item>
                        <MaskSection/>
                    </Grid>
                    <Grid item>
                        <VentilationSection/>
                    </Grid>
                </Grid>
            </section>
            <section>
                <Grid container direction="column">                    
                    <Grid item>
                        <Typography variant="h2">
                            { SUBTITLE_FINALTEASER }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            { TEASER_2 }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            { TEASER_3 }
                        </Typography>
                    </Grid>
                </Grid>
            </section>
            <section>
                {districtData !== undefined ? (
                    <CountyTeaser county={districtData.county} url={districtData.howToBehaveUrl} />
                ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                    </div>
                )}
            </section>
        </main>
        </>
    )
};
