import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { useTranslation } from "react-i18next";

const RKI = () => {
  const { t } = useTranslation("translation");

  return (
    <main className="sections">
      <section>
        <NavigationTitle title={t("rki.title")} backToExpandedFeatureInfo={true} />
      </section>

      <section>
        <Typography>{t("rki.intro")}</Typography>
        <Typography>{t("rki.text")}</Typography>
      </section>
    </main>
  );
};

export default RKI;
