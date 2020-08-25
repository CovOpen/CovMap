import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const CovMapWelcome = () => {
  return (
    <>
      <DialogTitle id="alert-dialog-title">{"Willkommen bei CovMap "}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            CovMap ist ein Gemeinschaftsprojekt der Charité, NETCHECK GmbH und des Hasso Plattner Instituts.
            Ein vemehrtes Kontaktverhalten geht mit einem erhöhten Risiko einer Infektion mit dem Coronavirus einher. Im Folgenden zeigen wir Dir eine Karte, aus der Du das aktuelle Kontaktverhalten der Bevölkerung pro Landkreis ersehen kannst. Je intensiver der Blauton in Deinem Landkreis ist, umso mehr Kontakte liegen vor. Falls dein Landkreis dunkelblau ist, überdenke, ob Du deine Kontakte einschränken kannst! Jeder Bürger kann dabei helfen, die Ausbreitung des Coronavirus zu verlangsamen!
        </DialogContentText>
      </DialogContent>
    </>
  )
}
