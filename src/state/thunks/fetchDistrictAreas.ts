import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchDistrictAreas() {
  return async (dispatch: ReduxDispatch) => {
    dispatch(AppApi.pushLoading('districtArea', 'Loading the post code areas...'))
    
    const res = await fetch('/data/districts_small.geojson');
    const json = await res.json();
        
    dispatch(AppApi.setDistrictAreas(json));
    dispatch(AppApi.popLoading('districtArea'))
  };
}
