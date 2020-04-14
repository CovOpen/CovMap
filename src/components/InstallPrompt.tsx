import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { AppApi } from "state/app";
import { useThunkDispatch } from "useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../state";
  
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    backgroundColor: theme.palette.primary.light,
    bottom: 0,
    zIndex: 9000
  },
  item: {
    margin: theme.spacing(2),
    textAlign: 'center',
  }
}));

type InstallPromptProps = {
  shouldShow: boolean;
}
type InstallPromptState = Function | null;

export const InstallPrompt = ({ shouldShow }: InstallPromptProps) => {
  const [prompt, setPrompt] = useState<InstallPromptState>(() => null)

  const classes = useStyles()
  const dispatch = useThunkDispatch()

  const triggerInstallPrompt = () => {
    setPrompt(() => null)
    dispatch(AppApi.setShowInstallPrompt(false))
    if (prompt) {
      prompt().then(result => {
        if (result.outcome === 'accepted') {
          dispatch(AppApi.setHasInstallPrompt(false))
        }
      })
    }
  }

  const cancelInstallPrompt = () => {
    dispatch(AppApi.setShowInstallPrompt(false))
  }
  
  useEffect(() => {
    const listener = event => {
      event.preventDefault()
      const boundPrompt = event.prompt.bind(event as any)
      dispatch(AppApi.setHasInstallPrompt(true))
      setPrompt(() => boundPrompt)
    }
      
    window.addEventListener('beforeinstallprompt', listener)
    return () => window.removeEventListener('beforeinstallprompt', listener)
  }, [])

  const dialog = (<div className={classes.root}>
    <p className={classes.item}>Diese App kann auf deinem Geraet installiert werden.</p>
    <p>Tappe den Button unten um dich zu entscheiden!</p>
    <Button className={classes.item} variant="contained" color="primary" onClick={triggerInstallPrompt}>Alles klar!</Button>
    <Button className={classes.item} variant="contained" color="primary" onClick={cancelInstallPrompt}>Nee danke.</Button>
  </div>);

  return useSelector((state: State) => state.app.showInstallPrompt) && shouldShow && prompt
    ? dialog
    : null
}