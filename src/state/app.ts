import { Reducer } from "./reduxHelper";
import { GeoJSON } from "geojson";
import { Mappable, LayerGroup } from '../app-config.types'

import { config } from '../../app-config/index'

const defaultVisual = config.visuals[config.defaultVisual]
const defaultLayerGroup = defaultVisual.layerGroups.find(group => group.default) || defaultVisual.layerGroups[0]
const defaultMappable = defaultLayerGroup.mappables.find(mappable => mappable.default) || defaultLayerGroup.mappables[0]

export const backendUrl = "/api";

export type MapSet = {
  id: string;
  geo: GeoJSON;
  timeKeys: Array<string>;
}

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

export type VisualId = string;

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export type CurrentFeature = {
  previousFeature?: any;
  feature: any;
  lngLat?: Array<number>;
}

export type SnackbarMessage = {
  text: string;
  type: 'info' | 'error' | 'warning';
  done?: boolean;
  duration?: number;
}

export type MapSetHolder = Map<VisualId, Map<string, MapSet>>

export interface AppState {
  activePage: string;
  viewport: Viewport;
  currentPosition: Array<number> | null;
  userAllowedLocation: boolean;
  currentArea: MapArea | null;
  history: string[];
  geos: Map<string, GeoJSON>;
  datasets: Map<string, MapData>;
  mappedSets: MapSetHolder;
  currentDate: Date; 
  currentMappable: Mappable;
  datasetFound: boolean;
  currentVisual: VisualId; // TODO: Rename to currentVisual (when moving to app-config driven build)
  loading: Map<string, string>;
  viewPortEventsCount: number;
  searchResult: boolean;
  snackbarMessage: SnackbarMessage;
  currentFeature: CurrentFeature;
  isInstalled: boolean;
  installPrompt: Function | null;
  currentLayerGroup: LayerGroup;
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
  geos: new Map<string, GeoJSON>(),
  datasets: new Map<string, MapData>(),
  mappedSets: new Map<VisualId, Map<string, MapSet>>(), 
  currentDate: new Date(),
  currentMappable: defaultMappable,
  datasetFound: true,
  currentVisual: config.defaultVisual,
  loading: new Map(),
  viewPortEventsCount: 0,
  searchResult: false,
  snackbarMessage: {
    text: '',
    type: 'info',
    done: true
  },
  currentFeature: { feature: null },
  isInstalled: false,
  installPrompt: null,
  currentLayerGroup: defaultLayerGroup
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
  public mergeViewport(partialViewport: Record<string, number>) {
    this.state.viewport = {
      ...this.state.viewport,
      ...partialViewport
    };
  }
  public setCurrentArea(area: MapArea) {
    this.state.currentArea = area;
  }
  public addGeo(id: string, geo: GeoJSON) {
    this.state.geos.set(id, geo);
  }
  public addDataset(id: string, data: MapData) {
    this.state.datasets.set(id, data);
  }
  public addMappedSet(visualId: VisualId, mappingId: string, data: MapSet) {
    if (!this.state.mappedSets.has(visualId)) {
      this.state.mappedSets.set(visualId, new Map<string, MapSet>())
    }
    this.state.mappedSets.get(visualId)?.set(mappingId, data);
  }
  public setCurrentDate(date: Date) {
    this.state.currentDate = date;
  }
  public setCurrentMappable(mappable: Mappable) {
    this.state.currentMappable = mappable;
  }
  public setDatasetFound(found: boolean) {
    this.state.datasetFound = found;
  }
  public setCurrentVisual(id: VisualId) {
    this.state.currentVisual = id;
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
  public setSnackbarMessage(message: SnackbarMessage) {
    const { done = false } = message
    this.state.snackbarMessage = {
      done,
      ...message
    }
  }
  public setCurrentFeature(feature: any, lngLat?: Array<number>) {
    this.state.currentFeature = {
      feature,
      lngLat,
      previousFeature: this.state.currentFeature?.feature
    }
  }
  public setIsInstalled(installed: boolean) {
    this.state.isInstalled = installed
  }
  public setInstallPrompt(prompt: Function | null) {
    this.state.installPrompt = prompt
  }
  public setLayerGroup(group: LayerGroup) {
    this.state.currentLayerGroup = group
  }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
