import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { Trans, useTranslation } from "react-i18next";

export const Imprint = () => {
  const { t } = useTranslation("translation");

  return (
    <>
      <main className="sections">
        <section>
          <NavigationTitle title={t("pages.copyright")} />
        </section>
        <section>
          <Typography variant="h2">{t("copyright.provider.title")}</Typography>
          <Typography variant="body1">{t("copyright.provider.text-1")}</Typography>
          <Typography variant="body1">{t("copyright.provider.text-2")}</Typography>
          <Typography variant="body1">{t("copyright.provider.text-3")}</Typography>
        </section>
        <section>
          <Typography variant="h2">{t("copyright.contact.title")}</Typography>
          <Typography variant="body1">
            <Trans i18nKey="copyright.contact.text-1">
              part-0<a href="mailto:covmap@charite.de">part-1</a>
            </Trans>
          </Typography>
          <Typography variant="body1">
            <Trans i18nKey="copyright.contact.text-2">
              part-0
              <a href="https://www.charite.de" target="_blank" rel="noreferrer">
                part-1
              </a>
            </Trans>
          </Typography>
        </section>

        <section>
          <Typography variant="h2">{t("copyright.responsible-media-law.title")}</Typography>
          <Typography variant="body1">{t("copyright.responsible-media-law.text-1")}</Typography>
          <Typography variant="body1">{t("copyright.responsible-media-law.text-2")}</Typography>
          <Typography variant="body1">{t("copyright.responsible-media-law.text-3")}</Typography>
          <Typography variant="body1">{t("copyright.responsible-media-law.text-4")}</Typography>
          <Typography variant="body1">{t("copyright.responsible-media-law.text-5")}</Typography>
        </section>

        <section>
          <Typography variant="h2">{t("copyright.competent-supervisory-authority.title")}</Typography>
          <Typography variant="body1">{t("copyright.competent-supervisory-authority.text-1")}</Typography>
          <Typography variant="body1">
            <Trans i18nKey="copyright.competent-supervisory-authority.text-2">
              part-0
              <a href="https://www.berlin.de/rbmskzl/" target="_blank" rel="noreferrer">
                part-1
              </a>
            </Trans>
          </Typography>
          <Typography variant="body1">{t("copyright.competent-supervisory-authority.text-3")}</Typography>
          <Typography variant="body1">
            <Trans i18nKey="copyright.competent-supervisory-authority.text-4">
              part-0
              <a href="https://www.berlin.de/sen/gpg/" target="_blank" rel="noreferrer">
                part-1
              </a>
            </Trans>
          </Typography>
          <Typography variant="body1">{t("copyright.competent-supervisory-authority.text-5")}</Typography>
        </section>
      </main>
    </>
  );
};
