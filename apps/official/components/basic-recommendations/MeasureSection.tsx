import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    Grid,
    Typography,
  } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles({
    accordion: {
        //background: "#B0C4DE"//"#2F4F4F"
    },
    summaryCard: {
        width: "100%",
        borderRadius: "12px",
    },
    summaryContent: {                
        fontWeight: "bold",        
        marginLeft: "8px",        
    },
    summaryText: {
        textAlign: "left",
    },    
});

interface MeasureSectionProps {
    title: string,
    description: string,
    backgroundColor: string,
    frontColor?: string,
    icon: any,  // this really should be the TS signature of the JS function created by svgr (TO DO)
}
export const MeasureSection: React.FC<MeasureSectionProps> = 
    ({title, description, backgroundColor, frontColor, icon}: MeasureSectionProps) => {

    const classes = useStyles();

    // to allow controlling of arrow icons...
    const [expanded, setExpanded] = React.useState(false);
    const toggleExpansion = () => (event, isExpanded) => {
        setExpanded(isExpanded);
    };
    
    initProps();

    const colorStyle = {
        background: backgroundColor,
        color: frontColor
    }

    function initProps() {
        if(frontColor == undefined) {
            frontColor = "#FFFFFF";  // white
        }        
    }

    var navIndicator;
    if(expanded) {
        navIndicator = <ExpandLessIcon/>
    } else {
        navIndicator = <ExpandMoreIcon/>
    }

    return (
        <Accordion 
            expanded={expanded} 
            onChange={toggleExpansion()}
            className={classes.accordion}>
            <AccordionSummary>
                <Card className={classes.summaryCard} style={colorStyle}> 
                    <CardContent className={classes.summaryContent} >
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={3}>
                                {icon()}
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="h3" align="left">
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                {navIndicator}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </AccordionSummary>
            <AccordionDetails>
                <Card className={classes.summaryCard} style={colorStyle}> 
                    <CardContent className={classes.summaryContent} >
                        <Typography variant="body1" align="justify">
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
            </AccordionDetails>
        </Accordion>
    );
}