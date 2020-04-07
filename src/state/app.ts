import { Reducer } from "./reduxHelper";
import { GeoJSON } from "geojson";

export enum Step {
  Welcome,
  Map,
  About,
  Imprint,
}
export const backendUrl = "/api";

export interface MapArea {
  celat: number;
  celng: number;
  nelat: number;
  nelng: number;
}

export type MapData = {
  types: Record<string, string>;
  data: Array<Record<string, Record<string, number>>>;
}

export enum VisualType {
  POSTCODE,
  HEATMAP
}

export type Viewport = {
  center: Array<number>;
  zoom: number;
}
export interface AppState {
  activeStep: Step;
  viewport: Viewport;
  currentPosition: Array<number> | null;
  userAllowedLocation: boolean;
  currentArea: MapArea | null;
  history: Step[];
  postCodeAreas: GeoJSON | null;
  postCodePoints: GeoJSON | null;
  currentDataset: MapData | null;
  datasetFound: boolean;
  visualType: VisualType;
  loading: Map<string, string>;
}

export const defaultAppState: AppState = {
  activeStep: Step.Map,
  userAllowedLocation: true,
  currentPosition: null,
  viewport: {
    center: [51.65892664880053, 10.129394531250002], // Germany as start position
    zoom: 5,
  },
  currentArea: null,
  history: [],
  postCodeAreas: null,
  postCodePoints: null,
  currentDataset: null,
  datasetFound: true,
  visualType: VisualType.POSTCODE,
  loading: new Map(),
};

class AppReducer extends Reducer<AppState> {
  constructor() {
    super(defaultAppState);
  }
  public gotoStep(step: Step) {
    window.history.pushState({ step: step}, Step[step]);
    this.state.history.push(this.state.activeStep);
    this.state.activeStep = step;
  }
  public setUserAllowedLocation(allowed: boolean) {
    this.state.userAllowedLocation = allowed;
  }
  public setCurrentPosition(position: Array<number>) {
    this.state.currentPosition = position;
  }
  public setViewport(viewport: Viewport) {
    this.state.viewport = viewport;
  }
  public setCurrentArea(area: MapArea) {
    this.state.currentArea = area;
  }
  public setPostCodeAreas(areas: GeoJSON) {
    this.state.postCodeAreas = areas;
  }
  public setPostCodePoints(points: GeoJSON) {
    this.state.postCodePoints = points;
  }
  public setCurrentDataset(data: MapData | null) {
    this.state.currentDataset = data;
  }
  public setDatasetFound(found: boolean) {
    this.state.datasetFound = found;
  }
  public setVisualType(type: VisualType) {
    this.state.visualType = type;
  }
  public pushLoading(id: string, message: string) {
    this.state.loading.set(id, message)
  }
  public popLoading(id: string) {
    this.state.loading.delete(id)
  }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
