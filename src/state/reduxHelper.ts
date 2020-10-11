import produce, { Draft } from "immer";

type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;
export type ActionCreators<T> = {
  [p in Exclude<keyof T, keyof Reducer>]: ReplaceReturnType<T[p], { type: string }>;
};

type Action = { type: string; payload: any };
export class Reducer<ReducerState extends {} = {}> {
  public state: ReducerState;
  public initialState: ReducerState;
  constructor(initialState: ReducerState) {
    this.initialState = initialState;
    this.state = initialState;
  }
  /**
   * Get an API Object for use in connected redux components.
   * Functions will have the same interface than your reducer but return Redux actions
   */
  public getApi(): ActionCreators<this> {
    const result = {} as any;
    // tslint:disable-next-line:forin
    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (!Reducer.prototype.hasOwnProperty(key) && typeof (this as any)[key] === "function") {
        result[key] = (...args: any): { type: string; payload: any } => ({
          payload: args,
          type: key,
        });
      }
    }
    return result;
  }

  /**
   * Get a Redux Reducer for use in combineReducers.
   */
  public getReduxReducer() {
    return (state: ReducerState = this.initialState, action: Action): ReducerState => {
      return produce<ReducerState>(state, (draft: Draft<ReducerState>) => {
        if (typeof (this as any)[action.type] === "function") {
          (this as any).state = draft;
          (this as any)[action.type].call(this, ...action.payload);
        }
      });
    };
  }
}
