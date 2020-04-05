import { ReduxDispatch } from "../../useThunkDispatch";
// import { AppApi, Step } from "../app";
// import { backendUrl } from "../app";

export function example() {
  return async (dispatch: ReduxDispatch, getState) => {
    // Based on some state...
    // const { position } = getState().app;
        
    // Do something async... (fetch some JSON for example)
    // const res = fetch(`https://${backendUrl}stuff`)
        
    // Then update state
    // dispatch(someStateUpdate(res.data))
    // dispatch(AppApi.gotoStep(Step.Home))
  };
}
