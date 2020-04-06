import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchDataset() {
  return async (dispatch: ReduxDispatch) => {
    dispatch(AppApi.pushLoading('dataset', 'Loading the dataset...'))
    
    const res = await fetch('/data/plz_small2.generated.json');
    const json = await res.json();
        
    dispatch(AppApi.setCurrentDataset(json));
    dispatch(AppApi.popLoading('dataset'))
  };
}
