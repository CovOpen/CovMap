import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { RiskScore } from "../../models"

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
            <CardHeader       
                action={
                    <IconButton                    
                        component={Link}
                        to="/risk-levels"
                        aria-label="show risk level explanations"
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                }
                classes={{ alignment }}        
            />
            <CardContent>
                {recommendation()}
            </CardContent>            
        </Card>
    )
}

const renderNormalRiskRecommendation = renderRecommendation(() => (
    <Typography variant="body1">
        Die Zahl der Neuinfektionen liegt unter 20 pro 100.000 Einwohner und das Kontaktverhalten der Bevölkerung sowie die Symptomlast sind normal. Ein normales Risiko bedeutet allerdings nicht, dass gar keine Infektionen in der Region möglich sind. Bitte beachte weiterhin die AHA + L Regeln.
    </Typography>
    )
)

const renderMediumRiskRecommendation = renderRecommendation(() => (
        <Typography variant="body1">
            Ein mittleres Risiko kann bei mehreren Szenarien bestehen: Entweder ist die Zahl der Neuinfektionen über 20 Neuinfektionen pro 100.000 Einwohner oder das Kontaktverhalten der Bevölkerung oder die Symptomlast ist erhöht, so dass die Zahl der Neuinfektionen demnächst weiter ansteigen könnte. Bitte die AHA + L Regeln beachten. Wir empfehlen darüber hinaus, die Anzahl der Kontakte freiwillig weitestgehend zu reduzieren.
        </Typography>
    )
)

const renderHighRiskRecommendation = renderRecommendation(() => (
        <Typography variant="body1">
            Die Zahl der Neuinfektionen ist stark erhöht und liegt über 50 pro 100.000 Einwohnern. Bitte weiterhin die AHA + L Regeln beachten und die Anzahl der Kontakte auf das Allernötigste reduzieren.
        </Typography>
    )
)

export const RiskRecommendation = ({ riskLevel } : {riskLevel: RiskScore}) => {
    switch(riskLevel) {
        case RiskScore.Low: 
            return renderNormalRiskRecommendation()            

        case RiskScore.Medium:
            return renderMediumRiskRecommendation()            

        case RiskScore.High:
            return renderHighRiskRecommendation()
            
        default:
            ;
    }
}