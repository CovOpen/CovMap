import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchPostCodePoints() {
  return async (dispatch: ReduxDispatch) => {
    const res = await fetch('/data/plz_points.geojson');
    const json = await res.json();
        
    dispatch(AppApi.setPostCodePoints(json));
  };
}
