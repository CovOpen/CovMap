import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import { FlyToInterpolator } from 'react-map-gl';

export function zoomIn() {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;
     
    const viewport = {
      ...state.viewport,
      zoom: state.viewport.zoom + 0.75,
      transitionDuration: 400,
      transitionInterpolator: new FlyToInterpolator()
    };
       
    dispatch(AppApi.setViewport(viewport));
  };
}

export function zoomOut() {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;
     
    const viewport = {
      ...state.viewport,
      zoom: state.viewport.zoom - 0.75,
      transitionDuration: 400,
      transitionInterpolator: new FlyToInterpolator()
    };
       
    dispatch(AppApi.setViewport(viewport));
  };
}
