import React from "react";
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardHeader, CardContent, Avatar, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { RiskTexts } from "../../models"

const useStyles = makeStyles({
    action: {
        alignSelf: "auto",
        marginTop: 0,
        marginLeft: "8px",
    }
})

const riskLevelHeader = () => {
    const classes = useStyles()
    return (    
        <CardHeader title="Risikostufen">
            <Grid container direction="row">
                <Grid item>
                <IconButton                    
                    component={Link}
                    to="/#"
                    color="primary"
                    aria-label="go back to map"
                >
                    <ArrowBackIosIcon />
                </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h1">Risikostufen</Typography>
                </Grid>
            </Grid>
        </CardHeader>
    )
}


export const RiskLevelsPage = () => (
    <>
        <main className="sections">
            <section>
                <Typography variant="h1">"Risikostufen"</Typography>
            </section>

            <section>
                <Typography variant="h2">Normales Risiko</Typography>
                <Typography variant="body1">
                    {RiskTexts.NORMAL}
                </Typography>
            </section>

            <section>
                <Typography variant="h2">Mittleres Risiko</Typography>
                <Typography variant="body1">
                    {RiskTexts.MEDIUM}
                </Typography>
            </section>

            <section>
                <Typography variant="h2">Hohes Risiko</Typography>
                <Typography variant="body1">
                    {RiskTexts.HIGH}
                </Typography>
            </section>
        </main>
    </>
);

    
    /*
    const classes  = useStyles()

    return (
        <div className={classes.action} id="risk-levels-page">
            <Card >                
                {riskLevelHeader()}
                <Typography variant="h2">Normales Risiko</Typography>
                <Typography>
                    {RiskTexts.NORMAL}
                </Typography>
                <Typography variant="h2">Mittleres Risiko</Typography>
                <Typography>
                    {RiskTexts.MEDIUM}
                </Typography>
                <Typography variant="h2">Hohes Risiko</Typography>
                <Typography>
                    {RiskTexts.HIGH}
                </Typography>
            </Card>
        </div>
    )
    */

