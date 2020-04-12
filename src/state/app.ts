import { Reducer } from "./reduxHelper";
import { GeoJSON } from "geojson";

export const backendUrl = "/api";

export interface MapArea {
  celat: number;
  celng: number;
  nelat: number;
  nelng: number;
}

export enum InternalPages {
  MAP = 'internal--gl--map'
}

export type MapData = {
  types?: Record<string, string>;
  data: Array<Record<string, Record<string, number>>>;
}

export enum VisualType {
  POSTCODE,
  HEATMAP,
  BUBBLEMAP,
  DISTRICTS,
  RKI_DISTRICTS
}

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
}
export interface AppState {
  activePage: string;
  viewport: Viewport;
  currentPosition: Array<number> | null;
  userAllowedLocation: boolean;
  currentArea: MapArea | null;
  history: string[];
  postCodeAreas: GeoJSON | null;
  postCodePoints: GeoJSON | null;
  districtAreas: GeoJSON | null;
  currentDataset: MapData | null;
  currentDay: number; 
  datasetFound: boolean;
  visualType: VisualType; // TODO: Rename to currentVisual (when moving to app-config driven build)
  loading: Map<string, string>;
  viewPortEventsCount: number;
}

export const defaultAppState: AppState = {
  activePage: InternalPages.MAP,
  userAllowedLocation: true,
  currentPosition: null,
  viewport: {
    latitude: 51.65892664880053,
    longitude: 10.129394531250002,
    zoom: 5,
  },
  currentArea: null,
  history: [],
  postCodeAreas: null,
  postCodePoints: null,
  districtAreas: null,
  currentDataset: null,
  currentDay: 0,
  datasetFound: true,
  visualType: VisualType.RKI_DISTRICTS,
  loading: new Map(),
  viewPortEventsCount: 0,
};

class AppReducer extends Reducer<AppState> {
  constructor() {
    super(defaultAppState);
  }
  public gotoPage(pageId: string) {
    window.history.pushState({ page: pageId }, pageId);
    this.state.history.push(this.state.activePage);
    this.state.activePage = pageId;
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
  public setDistrictAreas(areas: GeoJSON) {
    this.state.districtAreas = areas;
  }
  public setCurrentDataset(data: MapData | null) {
    this.state.currentDataset = data;
  }
  public setCurrentDay(day: number) {
    this.state.currentDay = day;
  }
  public setDatasetFound(found: boolean) {
    this.state.datasetFound = found;
  }
  public setVisualType(type: VisualType) {
    this.state.visualType = type;
  }
  public setViewportEventCount(count: number) {
    this.state.viewPortEventsCount = count;
  }
  public pushLoading(id: string, message: string) {
    if (!this.state.loading.has(id)) {
      this.state.loading.set(id, message)
    }
  }
  public popLoading(id: string) {
    this.state.loading.delete(id)
  }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
