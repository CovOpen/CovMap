import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';

export function zoomIn() {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;
     
    const viewport = {
      ...state.viewport,
      zoom: state.viewport.zoom + 0.5,
      transitionDuration: 5000,
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
      zoom: state.viewport.zoom - 0.5,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator()
    };
       
    dispatch(AppApi.setViewport(viewport));
  };
}
