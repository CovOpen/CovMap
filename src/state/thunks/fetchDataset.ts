import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchDataset(dateString?: string | undefined) {
  return async (dispatch: ReduxDispatch, getState) => {
    dispatch(AppApi.pushLoading('dataset', 'Loading the dataset...'))
    
    const { datasetFound } = getState().app;

    const url = `/data/plz_small2.generated.${dateString}.json`;
    
    try {
      const res = await fetch(url);
      
      if (res.status === 200) {
        const json = await res.json();
        dispatch(AppApi.setCurrentDataset(json));
        if (!datasetFound) {
          dispatch(AppApi.setDatasetFound(true))
        }
      } else if (res.status === 404) {
        AppApi.setCurrentDataset(null)
        dispatch(AppApi.setDatasetFound(false))
      }
    } catch(err) {
      // TODO: Show "no data for given day" notification/text in middle of map
    } finally {
      dispatch(AppApi.popLoading('dataset'))
    } 
  };
}
