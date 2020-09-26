import React from 'react'
import { FeatureInfoProps } from '../../../src/app-config.types'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const CovMapFeatureInfo = ({ feature, onClose, rawData }: FeatureInfoProps) => {
  return (
    <div>
      <Typography variant="h2">{feature.properties.name}</Typography>
      <ul>
        <li style={{marginTop: "0.4em", marginBottom: "0.4em"}}>Contact Index C: {rawData['CI']}</li>
        <li>Einwohner: {rawData['inhabitants']}</li>
        <li>PLZ: {rawData['plz']}</li>
        <li>Fläche: {rawData['area']}</li>
        <li>Name: {rawData['names']}</li>
        <li>Landkreis: {rawData['Landkreis']}</li>
      </ul>
      <Button size="small" onClick={onClose as any}>
        Schließen
      </Button>
    </div>
  )
}