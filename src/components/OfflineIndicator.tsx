import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  indicator: {
    padding: '4px 6px',
    borderRadius: '1rem',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: theme.typography.fontFamily,
  },
  redBubble: {
    backgroundColor: theme.palette.error.main,
    borderRadius: '50%',
    height: '1rem',
    width: '1rem',
    marginRight: '0.25rem'
  }
}));

export function OfflineIndicator() {
  const classes = useStyles()
  const [shouldShow, setShouldShow] = useState<boolean>(() => false)
  
  useEffect(() => {
    (navigator as any).connection.onchange = () => setShouldShow(() => !navigator.onLine)

    return () => (navigator as any).connection.onchange = undefined
  }, [])
  return shouldShow
    ? (<div className={classes.indicator}><div className={classes.redBubble}></div>Offline</div>)
    : null
}