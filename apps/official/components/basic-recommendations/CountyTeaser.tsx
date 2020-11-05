import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles({
  leftText: {
    textAlign: "left",
  },
  teaser: {
    border: 0,
    background: "#2979ff",
    color: "white",
    textTransform: "none",
  },
});

interface CountyTeaserProps {
  county: string;
  url: string;
}

export const CountyTeaser: React.FC<CountyTeaserProps> = ({ county, url }: CountyTeaserProps) => {
  const classes = useStyles();

  const COUNTY_TEASER = "Informiere Dich hier über aktuelle Verhaltensregeln für ";
  const teaser = `${COUNTY_TEASER}${county}`;

  return (
    <Button href={url} target="_blank" disableRipple>
      <Card className={classes.teaser}>
        <CardContent>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.leftText}>
                {teaser}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <ArrowForwardIosIcon fontSize="small" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Button>
  );
};
