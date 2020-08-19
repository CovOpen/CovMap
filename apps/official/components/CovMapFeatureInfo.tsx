import React from 'react'
import { FeatureInfoProps } from '../../../src/app-config.types'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const CovMapFeatureInfo = ({ feature, onClose, rawData }: FeatureInfoProps) => {
  return (
    <div>
      <Typography variant="h2">{feature.properties.name}</Typography>
      <ul>
        <li style={{marginTop: "0.4em", marginBottom: "0.4em"}}>Contact Index C: 42</li>
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