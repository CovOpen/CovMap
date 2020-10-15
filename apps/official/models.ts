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
  NORMAL = "Die Zahl der Neuinfektionen liegt unter 20 pro 100.000 Einwohner und das Kontaktverhalten der Bevölkerung sowie die Symptomlast sind normal. Ein normales Risiko bedeutet allerdings nicht, dass gar keine Infektionen in der Region möglich sind. Bitte beachte weiterhin die AHA + L Regeln.",
  MEDIUM = "Ein mittleres Risiko kann bei mehreren Szenarien bestehen: Entweder ist die Zahl der Neuinfektionen über 20 Neuinfektionen pro 100.000 Einwohner oder das Kontaktverhalten der Bevölkerung oder die Symptomlast ist erhöht, so dass die Zahl der Neuinfektionen demnächst weiter ansteigen könnte. Bitte die AHA + L Regeln beachten. Wir empfehlen darüber hinaus, die Anzahl der Kontakte freiwillig weitestgehend zu reduzieren.",
  HIGH = "Die Zahl der Neuinfektionen ist stark erhöht und liegt über 50 pro 100.000 Einwohnern. Bitte weiterhin die AHA + L Regeln beachten und die Anzahl der Kontakte auf das Allernötigste reduzieren."
}
