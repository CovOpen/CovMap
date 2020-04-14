import React from 'react'
import { FeatureInfoProps } from '../../src/app-config.types'
import { Typography, Button } from "@material-ui/core";

export const RKIFeatureInfo = ({ feature, onClose, rawData }: FeatureInfoProps) => {
  return (
    <div>
      <Typography variant="h2">{feature.properties.name}</Typography>
      <ul>
        <li><b>Betroffenenrate: {Math.floor(rawData['cases_per_population'] * 100) / 100} %</b></li>
        <li>F&auml;lle: {rawData['cases']}</li>
        <li>Verstorben: {rawData['deaths']}</li>
        <li>F&auml;lle per 100k: {Math.ceil(rawData['cases_per_100k'])}</li>
        <li>Sterberate: {Math.floor(rawData['death_rate'] * 100) / 100} %</li>
      </ul>
      <Button size="small" onClick={onClose as any}>
        Schließen
      </Button>
    </div>
  )
}