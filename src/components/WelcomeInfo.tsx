import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { State } from "../state";

export const AlertDialog = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={'paper'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Willkommen bei CovMapper "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hier siehst du die aktuelle Anzahl an Corona Infizierten pro Landkreis in Deutschland.
            Du kannst dir auch andere Daten anschauen, indem du auf das Menü unten links klickst. Oder schaue
            dir den zeitlichen Verlauf an, indem du die Zeitleiste am unteren Bildschirmrand bewegst.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Schließen.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
