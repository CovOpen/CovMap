import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Grid,
    Typography,
 } from "@material-ui/core";

import NoContactsIcon from "../../static/images/no-contacts.svg";
import DistanceIcon from "../../static/images/distance.svg";
import HygieneIcon from "../../static/images/hand-washing.svg";
import MaskIcon from "../../static/images/mask.svg";
import VentilationIcon from "../../static/images/fresh-air.svg";
import RegionalIcon from "../../static/images/checklist.svg";

import { MeasureSection } from './MeasureSection';

/** FOR TRANSLATION --> */
const INTRO_TEASER_2 = "In den letzten Monaten konnte immer wieder gezeigt werden, dass ganz einfache Maßnahmen, die von jedem umgesetzt werden können, sehr viel Wirkung haben. ";
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
/** <-- FOR TRANSLATION */

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

export const WhatCanIDoPage: React.FC<{}> = () => {

    const classes = useStyles();
    
    return (
        <>
        <main className="sections">
            <section>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h3" className={classes.subHeader}>
                            {INTRO_TEASER_2}
                        </Typography>
                    </Grid>
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
        </main>
        </>
    )
}





