import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { RiskScore, RiskTexts } from "../../models"

const useStyles = makeStyles({   
    alignment: {
        alignSelf: "auto",
        marginTop: 0,
        marginLeft: "8px",
        },
    container: {
        maxWidth: "300px",
    },
        
});


const renderRecommendation = (recommendation: () => any) => () => {
    const { alignment } = useStyles()
    
    return (
        <Card>            
            <CardContent>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={9}>
                    {recommendation()}
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton                    
                            component={Link}
                            to="/risk-levels"
                            aria-label="show risk level explanations"
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>            
        </Card>
    )
}

const renderNormalRiskRecommendation = renderRecommendation(() => (
    <Typography variant="body1">
        {RiskTexts.NORMAL}
    </Typography>
    )
)

const renderMediumRiskRecommendation = renderRecommendation(() => (
        <Typography variant="body1">
            {RiskTexts.MEDIUM}
        </Typography>
    )
)

const renderHighRiskRecommendation = renderRecommendation(() => (
        <Typography variant="body1">
            {RiskTexts.HIGH}
        </Typography>
    )
)

export const RiskRecommendation = ({ riskScore } : {riskScore: RiskScore}) => {
    switch(riskScore) {
        case RiskScore.Low: 
            return renderNormalRiskRecommendation()            

        case RiskScore.Medium:
            return renderMediumRiskRecommendation()            

        case RiskScore.High:
            return renderHighRiskRecommendation()
            
        default:
            console.warn("cannot display risk score -- unrecognized score value");
            return (<></>)
    }
}