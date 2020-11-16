import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { Trans, useTranslation } from "react-i18next";

export const Privacy = () => {
  const { t } = useTranslation("translation");

  return (
    <>
      <main className="sections">
        <section>
          <NavigationTitle title={t("privacy.title")} />
        </section>
        <section>
          <Typography variant="h2">1. {t("privacy.responsible.title")}</Typography>
          <Typography variant="body1" style={{ whiteSpace: "break-spaces" }} component="div">
            <Trans i18nKey="privacy.responsible.text">
              <p>part-0</p>
              <p>part-1</p>
              <p>
                part-2
                <a href="http://www.charite.de" target="_blank" rel="noreferrer">
                  nested-part-1
                </a>
              </p>
              <p>part-4</p>
              <p>part-5</p>
            </Trans>
          </Typography>
        </section>

        <section>
          <Typography variant="h2">2. {t("privacy.data-protection-officer.title")}</Typography>
          <Typography variant="body1" style={{ whiteSpace: "break-spaces" }}>
            {t("privacy.data-protection-officer.text")}
          </Typography>
        </section>

        <section>
          <Typography variant="h2">3. {t("privacy.personal-data.title")}</Typography>
          <Typography variant="body1">{t("privacy.personal-data.text")}</Typography>
        </section>

        <section>
          <Typography variant="h2">4. {t("privacy.installation.title")}</Typography>
          <Typography variant="body1">{t("privacy.installation.text")}</Typography>
        </section>

        <section>
          <Typography variant="h2">5. {t("privacy.calling-covmap.title")}</Typography>
          <Typography variant="body1" style={{ whiteSpace: "break-spaces" }}>
            {t("privacy.calling-covmap.text")}
          </Typography>
        </section>

        <section>
          <Typography variant="h2">6. {t("privacy.recipient-of-personal-data.title")}</Typography>
          <Typography variant="body1" style={{ whiteSpace: "break-spaces" }}>
            {t("privacy.recipient-of-personal-data.text")}
          </Typography>
        </section>

        <section>
          <Typography variant="h2">7. {t("privacy.no-obligation-to-provide.title")}</Typography>
          <Typography variant="body1">{t("privacy.no-obligation-to-provide.text")}</Typography>
        </section>

        <section>
          <Typography variant="h2">8. {t("privacy.your-rights.title")}</Typography>
          <Typography variant="body1" style={{ whiteSpace: "break-spaces" }}>
            {t("privacy.your-rights.text")}
          </Typography>
        </section>
      </main>
    </>
  );
};
