import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function zoomIn() {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;
     
    const viewport = {
      ...state.viewport,
      zoom: state.viewport.zoom + 1,
    };
       
    dispatch(AppApi.setViewport(viewport));
  };
}

export function zoomOut() {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;
     
    const viewport = {
      ...state.viewport,
      zoom: state.viewport.zoom - 1,
    };
       
    dispatch(AppApi.setViewport(viewport));
  };
}
