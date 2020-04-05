import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

export type ReduxDispatch = ThunkDispatch<any, any, Action>;
export function useThunkDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
