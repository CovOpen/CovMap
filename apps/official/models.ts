export enum RiskScore {
  Low = 1,
  Medium = 2,
  High = 3,
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

export enum RiskTexts {
  NORMAL = "Die Zahl der Neuinfektionen ist niedrig, das Kontaktverhalten ist ausreichend reduziert und die Symptomlast ist normal. Ein normales Risiko bedeutet allerdings nicht, dass gar keine Infektionen in der Region möglich sind",
  MEDIUM = "Die Zahl der Neuinfektionen oder das Kontaktverhalten bzw. die Symptomlast der Bevölkerung ist erhöht, so dass die Zahl der Neuinfektionen demnächst weiter ansteigen könnte. Wir empfehlen, die Anzahl der Kontakte freiwillig weitestgehend zu reduzieren.",
  HIGH = "Die Zahl der Neuinfektionen ist stark erhöht. Wir empfehlen, die Anzahl der Kontakte freiwillig auf das Allernötigste zu reduzieren.",
}
