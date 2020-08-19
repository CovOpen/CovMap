import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const CovMapWelcome = () => {
  return (
    <>
      <DialogTitle id="alert-dialog-title">{"Willkommen bei CovMapper "}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Hier siehst du die aktuelle Anzahl an Corona Infizierten pro Landkreis in Deutschland.
            Du kannst dir auch andere Daten anschauen, indem du auf das Menü unten links klickst. Oder schaue
            dir den zeitlichen Verlauf an, indem du die Zeitleiste am unteren Bildschirmrand bewegst.
        </DialogContentText>
      </DialogContent>
    </>
  )
}