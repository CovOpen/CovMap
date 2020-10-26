import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function flyTo(lng: number, lat: number) {
  return async (dispatch: ReduxDispatch, getState) => {
    const { default: FlyToInterpolator } = await import(
      /* webpackChunkName: "mapgl" */ "react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator"
    );
    const state = getState().app;

    const newViewport = {
      ...state.viewport,
      latitude: lat,
      longitude: lng,
      transitionDuration: 400,
      transitionInterpolator: FlyToInterpolator ? new (FlyToInterpolator as any)({ curve: 1 }) : null,
    };
    dispatch(AppApi.setViewport(newViewport));
  };
}
