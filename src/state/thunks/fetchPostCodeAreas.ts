// import { ReduxDispatch } from "../../useThunkDispatch";
// import { AppApi } from "../app";

// export function fetchPostCodeAreas() {
//   return async (dispatch: ReduxDispatch) => {
//     dispatch(AppApi.pushLoading('postCodeArea', 'Loading the post code areas...'))
    
//     const res = await fetch('/data/plz_small2.geojson');
//     const json = await res.json();
        
//     dispatch(AppApi.setPostCodeAreas(json));
//     dispatch(AppApi.popLoading('postCodeArea'))
//   };
// }
