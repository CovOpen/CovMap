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
Demoversion für interne Demonstrationszwecke.   
         CovMap ist ein Gemeinschaftsprojekt der Charité, der NETCHECK GmbH und des Hasso Plattner Instituts.
            Ein vermehrtes Kontaktverhalten kann mit einem erhöhten Risiko von neuen Infektionen mit dem Coronavirus (SARS-CoV-2) einhergehen. Im Folgenden zeigen wir Dir eine Karte, aus der Du das aktuelle Kontaktverhalten der Bevölkerung pro Landkreis ersehen kannst. Je intensiver der Blauton in Deinem Landkreis ist, umso mehr Kontakte liegen vor. Falls in Deinem Landkreis ein erhöhtes Kontaktverhalten vorliegen sollte, dann überdenke, ob Du Deine Kontakte einschränken kannst! Jeder Bürger kann dabei helfen, die Ausbreitung des Coronavirus zu verlangsamen!


        </DialogContentText>
      </DialogContent>
    </>
  )
}
