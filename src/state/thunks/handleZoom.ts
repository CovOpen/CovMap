import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function zoomIn() {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;
     
    const viewport = {
        ...state.viewport,
        longitude: state.viewport.longitude,
        latitude: state.viewport.latitude,
        zoom: state.viewport.zoom + 1,
    };
       
    AppApi.setViewport(viewport);
    };

}

