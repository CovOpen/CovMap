import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, VisualType } from "../app";

const typeToDataUrl = {
  [VisualType.POSTCODE]: (dateString) => `/data/plz_small2.generated.${dateString}.json`,
  [VisualType.HEATMAP]: (dateString) => `/data/plz_small2.generated.${dateString}.json`,
  [VisualType.BUBBLEMAP]: (dateString) => `/data/plz_small2.generated.${dateString}.json`,
  [VisualType.DISTRICTS]: (dateString) => `/data/plz_small2.generated.${dateString}.json`,
  [VisualType.RKI_DISTRICTS]: (dateString) => `https://warte.app/api/rki/rki-district-case-numbers?fields=BL,RS,EWZ,cases,deaths,cases_per_100k,cases_per_population,cases7_per_100k,death_rate&limit=0&date=${dateString}`,
};

let count = 0
let latestFetch = 0

export function fetchDataset(dateString?: string | undefined) {
  return async (dispatch: ReduxDispatch, getState) => {
    dispatch(AppApi.pushLoading('dataset', 'Loading the dataset...'))
    
    const { visualType } = getState().app;

    const maybeURLMethod = typeToDataUrl[visualType];
    let url = maybeURLMethod;
    if (typeof maybeURLMethod === 'function') {
      url = maybeURLMethod(dateString);
    }

    try {
      count += 1
      const thisFetch = count
      const res = await fetch(url);
      if(thisFetch !== count) {
        return
      }

      if (res.status === 200) {
        const json = await res.json();
        if (visualType === VisualType.RKI_DISTRICTS) {
          if (json.result.length === 0) {
            dispatch(AppApi.setCurrentDataset(null))
            dispatch(AppApi.setDatasetFound(false))
          } else {
            const propertiesByCCA2 = json.result.reduce((acc, curr) => Object.assign(acc, {
              [curr.RS]: curr
            }), {})
            dispatch(AppApi.setCurrentDataset({
              data: propertiesByCCA2
            }));
            dispatch(AppApi.setDatasetFound(true))
          }
        } else {
          dispatch(AppApi.setCurrentDataset(json))
          dispatch(AppApi.setDatasetFound(true))
        }
      } else if (res.status === 404) {
        dispatch(AppApi.setCurrentDataset(null))
        dispatch(AppApi.setDatasetFound(false))
      }
    } catch(err) {
      // TODO: Show error snackbar
      console.error(err)
      dispatch(AppApi.setCurrentDataset(null))
    } finally {
      dispatch(AppApi.popLoading('dataset'))
    } 
  };
}
