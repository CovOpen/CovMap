import React, { ReactElement } from "react";
import { 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    Grid,
    Typography,
  } from "@material-ui/core";


interface MeasureSectionProps {
    title: string,
    description: string,
    color: string,
    icon: any,  // this really should be the TS signature of the JS function created by svgr (TO DO)
}
export const MeasureSection: React.FC<MeasureSectionProps> = 
    ({title, description, color, icon}: MeasureSectionProps) => {

    const summaryStyle = {
        backgroundColor: color,
        color: "white",
        width: "100%",
    };

    const detailsStyle = {
        width: "100%",
    };

    return (
        <Accordion>
            <AccordionSummary>
                <Card style={summaryStyle}> 
                    <CardContent >
                        <Grid container direction="row">
                            <Grid item>
                                {icon()}
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">
                                    {title}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body1" style={detailsStyle}>
                    {description}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}