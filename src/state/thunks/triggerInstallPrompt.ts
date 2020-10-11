import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import { State } from "../";

export function triggerInstallPrompt(cb?: (any) => any) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    const { installPrompt, isInstalled } = getState().app;

    if (installPrompt && !isInstalled) {
      const result = await installPrompt();
      if (result.outcome === "accepted") {
        dispatch(AppApi.setIsInstalled(true));
        dispatch(AppApi.setInstallPrompt(null));
      }
      cb && cb(result);
    }
  };
}
