import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchPostCodePoints() {
  return async (dispatch: ReduxDispatch) => {
    dispatch(AppApi.pushLoading('postCodePoints', 'Loading the post code points...'))
    
    const res = await fetch('/data/plz_points.geojson');
    const json = await res.json();
        
    dispatch(AppApi.setPostCodePoints(json));
    dispatch(AppApi.popLoading('postCodePoints'))
  };
}
