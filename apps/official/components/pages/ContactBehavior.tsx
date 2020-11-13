import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { Trans, useTranslation } from "react-i18next";

const ContactBehavior = () => {
  const { t } = useTranslation("translation");

  return (
    <main className="sections">
      <section>
        <NavigationTitle title={t("pages.contact-behavior")} backToExpandedFeatureInfo={true} />
      </section>

      <section>
        <Typography>{t("contact-behavior.intro")}</Typography>
        <Typography>
          <Trans i18nKey="contact-behavior.text-1">
            part-0
            <a href={t("contact-behavior.external-explanation-reproduction-rate")} target="_blank" rel="noopener">
              link-title
            </a>
            part-2
          </Trans>
        </Typography>
        <Typography>{t("contact-behavior.text-2")}</Typography>
        <Typography>{t("contact-behavior.text-3")}</Typography>
        <Typography>
          <Trans i18nKey="contact-behavior.text-4">
            part-0
            <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2" target="_blank" rel="noopener">
              Modell für das Kontaktverhalten auf Basis von GPS Daten
            </a>
            part-2
          </Trans>
        </Typography>
        <Typography>{t("contact-behavior.text-5")}</Typography>
      </section>
    </main>
  );
};

export default ContactBehavior;
