export type FederalState = { center: Array<number>; name: string }

export const states: Record<string, FederalState> = {
  MV: { center: [53.7531923503,12.5346461657], name: 'Mecklenburg-Vorpommern' },
  HB: { center: [53.1996105228,8.7434633604], name: 'Bremen' },
  HH: { center: [53.5476763891,10.0156448935], name: 'Hamburg' },
  TH: { center: [50.9038750318,11.02487358], name: 'Thüringen' },
  SH: { center: [54.1841329409,9.81632612126], name: 'Schleswig-Holstein' },
  SL: { center: [49.3843652646,6.95313387213], name: 'Saarland' },
  BW: { center: [48.5454687389,9.04641232904], name: 'Baden-Württemberg' },
  BY: { center: [48.9475759128,11.4199119426], name: 'Bayern' },
  BB: { center: [52.4728841299,13.3977677446], name: 'Brandenburg' },
  HE: { center: [50.6032229234,9.03105689213], name: 'Hessen' },
  BE: { center: [52.5015268456,13.4018588959], name: 'Berlin' },
  NI: { center: [52.7657181071,52.7657181071], name: 'Niedersachsen' },
  ST: { center: [52.0131773112,11.7006803572], name: 'Sachsen-Anhalt' },
  SN: { center: [51.0523325446,13.3485561973], name: 'Sachsen' },
  NRW: { center: [51.4798348001,7.56227977848], name: 'Nordrhein-Westfalen' },
  RP: { center: [49.9136851839,7.4491186497], name: 'Rheinland-Pfalz' },
}