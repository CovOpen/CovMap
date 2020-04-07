import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export const getFallbackComponent = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress></CircularProgress>
    </Backdrop>
  )
}