import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import { RiskTexts } from "../../models"

const useStyles = makeStyles({
    root: {
        border: 0,

    }
})

export const RiskLevelsPage = () => {

    const classes  = useStyles()

    return (
        <div className={classes.root} id="risk-levels-page">
            <Paper elevation={1}>                
                <Typography variant="h1">Risikostufen</Typography>
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
            </Paper>
        </div>
    )
}