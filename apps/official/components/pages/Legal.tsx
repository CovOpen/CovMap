import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { useTranslation } from "react-i18next";

export const Legal = () => {
  const { t } = useTranslation("translation");

  return (
    <>
      <main className="sections">
        <section>
          <NavigationTitle title={t("pages.legal")} />
        </section>
        <section>
          <Typography variant="h2">{t("legal.legal-info.title")}</Typography>
          <Typography variant="body1">{t("legal.legal-info.text")}</Typography>
        </section>
        <section>
          <Typography variant="h2">{t("legal.general-info.title")}</Typography>
          <Typography variant="body1">{t("legal.general-info.text")}</Typography>
        </section>

        <section>
          <Typography variant="h2">{t("legal.liability-for-contents.title")}</Typography>
          <Typography variant="body1">{t("legal.liability-for-contents.text")}</Typography>
        </section>

        <section>
          <Typography variant="h2">{t("legal.liability-for-links.title")}</Typography>
          <Typography variant="body1">{t("legal.liability-for-links.text")}</Typography>
        </section>

        <section>
          <Typography variant="h2">{t("legal.copyright.title")}</Typography>
          <Typography variant="body1">{t("legal.copyright.text")}</Typography>
        </section>
      </main>
    </>
  );
};
