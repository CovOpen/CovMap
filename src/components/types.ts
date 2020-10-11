// TODO: Remove when all visuals are moved to app-config
export type VisualProps = {
  districtAreas?: any;
  postCodeAreas?: any;
  postCodePoints?: any;
  currentDataset: any;
  dataField: string;
};

export type FeatureInfoProps = {
  feature: any; // TODO: use mapbox-gl feature type
  dataField: string;
};
