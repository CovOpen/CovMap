import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchDataset(dateString?: string | undefined) {
  return async (dispatch: ReduxDispatch) => {
    dispatch(AppApi.pushLoading('dataset', 'Loading the dataset...'))
    
    let url = '/data/plz_small2.generated.json';
    if (dateString) {
      url = `/data/plz_small2.generated.${dateString}.json`;
    }

    try {
      const res = await fetch(url);
      const json = await res.json();
      dispatch(AppApi.setCurrentDataset(json));
    } catch(err) {
      // TODO: Show "no data for given day" notification/text in middle of map
    } finally {
      dispatch(AppApi.popLoading('dataset'))
    } 
  };
}
