import React from "react";
import { WelcomeModal1 } from "./WelcomeModal1";
import { WelcomeModal2 } from "./WelcomeModal2";
import { WelcomeModal3 } from "./WelcomeModal3";
import { WelcomeModalPostalCode } from "./WelcomeModalPostalCode";
import { config } from "app-config/index";

export type StepConfig = {
  name: WelcomeModalStep;
  Component: React.FC;
  next?: WelcomeModalStep;
  previous?: WelcomeModalStep;
  skip?: WelcomeModalStep;
  dotProgressNumber?: number;
};

export const enum WelcomeModalStep {
  Step1 = "welcome1",
  Step2 = "welcome2",
  Step3 = "welcome3",
  StepPostalCode = "postalCode",
  StepPostalCodeDataPrivacy = "postalCodeDataPrivacy",
}

export const welcomeStepsConfig: StepConfig[] = [
  {
    name: WelcomeModalStep.Step1,
    Component: WelcomeModal1,
    next: WelcomeModalStep.Step2,
    skip: WelcomeModalStep.StepPostalCode,
    dotProgressNumber: 0,
  },
  {
    name: WelcomeModalStep.Step2,
    Component: WelcomeModal2,
    previous: WelcomeModalStep.Step1,
    next: WelcomeModalStep.Step3,
    skip: WelcomeModalStep.StepPostalCode,
    dotProgressNumber: 1,
  },
  {
    name: WelcomeModalStep.Step3,
    Component: WelcomeModal3,
    previous: WelcomeModalStep.Step2,
    next: WelcomeModalStep.StepPostalCode,
    skip: WelcomeModalStep.StepPostalCode,
    dotProgressNumber: 2,
  },
  {
    name: WelcomeModalStep.StepPostalCode,
    Component: WelcomeModalPostalCode,
  },
  {
    name: WelcomeModalStep.StepPostalCodeDataPrivacy,
    Component: () => (
      <div style={{ marginBottom: "28px" }}>
        <config.content.PrivacyComponent />
      </div>
    ),
    next: WelcomeModalStep.StepPostalCode,
  },
];
