import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchPostCodeAreas() {
  return async (dispatch: ReduxDispatch) => {
    const res = await fetch('/data/plz_small2.geojson');
    const json = await res.json();
        
    dispatch(AppApi.setPostCodeAreas(json))
  };
}
