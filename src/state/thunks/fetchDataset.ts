import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchDataset() {
  return async (dispatch: ReduxDispatch) => {
    const res = await fetch('/data/plz_small2.generated.json');
    const json = await res.json();
        
    dispatch(AppApi.setCurrentDataset(json));
  };
}
