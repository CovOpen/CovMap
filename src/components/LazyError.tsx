import { useEffect } from 'react'
import { AppApi } from "src/state/app";
import { useThunkDispatch } from "src/useThunkDispatch";

export const LazyError = () => {
  const dispatch = useThunkDispatch();
  
  useEffect(() => {
    dispatch(AppApi.setSnackbarMessage({ 
      text: 'Check you network connection and refresh the app/page.', 
      type: 'error',
      duration: 30000  
    }))
  }, [])
  
  return null;
}