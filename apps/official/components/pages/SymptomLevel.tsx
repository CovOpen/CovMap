import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { Trans, useTranslation } from "react-i18next";

const SymptomLevel = () => {
  const { t } = useTranslation("translation");

  return (
    <main className="sections">
      <section>
        <NavigationTitle title={t("symptom-level.title")} backToExpandedFeatureInfo={true} />
      </section>

      <section>
        <Typography>
          <Trans i18nKey="symptom-level.text">
            part-0
            <a target="_blank" href="http://www.covapp.de" rel="noreferrer">
              part-1
            </a>
            part-2
          </Trans>
        </Typography>
      </section>
    </main>
  );
};

export default SymptomLevel;
