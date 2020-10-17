import React from "react"
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { white } from '@material-ui/core/colors';
import { RiskScore } from "../models"

import { RiskBadge } from "./RiskBadge"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
            highactive: {
                color: white,
                backgroundColor: '#ff1744',
            },
            highpassive: {
                color: white,
                backgroundColor: '#f381a7',
            },
            mediumactive: {
                color: white,
                backgroundcolor: '#ffef62'

            },
            mediumpassive: {
                color: white,
                backgroundcolor: '#ffef62'

            },
            normalactive: {
                color: white,
                backgroundColor: green[500],
            },
            normalpassive: {
                color: white,
                backgroundColor: green[500],
            }
        }
    }),
)

/**
 * A group of three squared badges representing risk scores.
 * The active score is enlarged and the color more prominent.
 */
export const RiskBadgeGroup = ({{ riskScore, activeScore }: { riskScore: RiskScore, activeScore: RiskScore }) => {

    

    return (
        <Grid container direction="row">
            <Grid item>
                <RiskBadge riskScore={riskScore}/>

            </Grid>
        </Grid>
    )
}