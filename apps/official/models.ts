export enum RiskScore {
  Low = 1,
  Medium = 2,
  High = 3,
  Higher = 4,
}

export enum ContactScore {
  Low = 0,
  Medium = 1,
}

export interface RawDataEntry {
  IdDistrict: string;
  locationName: string;
  incidence: number;
  howToBehaveUrl: string;
  contactIndex: number;
  contactScore: ContactScore;
  riskScore: RiskScore;
  symptomIndex: number;
}
