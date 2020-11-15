import React from "react";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { RiskBadge } from "../RiskBadge";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import ContactsMediumBackgroundIcon from "../../static/images/contacts-medium-background.svg";
import { Trans, useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  textBlock: {
    marginBottom: "10px",
  },
}));

const FaqAccordion: React.FC<{ title: string }> = (props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h3" style={{ margin: "10px" }}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
};

const RiskHeading: React.FC<{ risk: 1 | 2 | 3 }> = ({ risk = 1 }) => {
  const { t } = useTranslation("translation");
  const riskText = ["risk-score-result.low", "risk-score-result.medium", "risk-score-result.high"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <RiskBadge riskScore={risk} />
      <Typography variant="h3" style={{ margin: "0 1rem" }}>
        {t(`${riskText[risk - 1] || "risk-score-result.low"}`)}
      </Typography>
    </div>
  );
};

export const Faq: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <main className="sections">
      <section>
        <NavigationTitle title={t("faq.title")} />
      </section>

      <section>
        <FaqAccordion title={t("faq.what-is-covmap.title")}>
          <Typography style={{ width: "100%" }} component="div">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className={classes.textBlock}>{t("faq.what-is-covmap.text")}</div>
              <div className={classes.textBlock}>
                <ul style={{ listStyle: "inside" }}>
                  <li>{t("faq.what-is-covmap.regional-risk")}</li>
                  <li>{t("faq.what-is-covmap.how-to-protect")}</li>
                  <li>{t("faq.what-is-covmap.current-rules-in-county")}</li>
                </ul>
              </div>
              <div className={classes.textBlock}>{t("faq.what-is-covmap.outro")}</div>
            </div>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.how-to-access.title")}>
          <Typography style={{ width: "100%" }}>
            <Trans i18nKey="faq.how-to-access.text">
              part-0
              <a href="https://www.covmap.de" target="_blank" rel="noopener">
                part-1
              </a>
              part-2
              <a href="https://covmap.charite.de" target="_blank" rel="noopener">
                part-3
              </a>
              part-4
            </Trans>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.what-is-special.title")}>
          <Typography style={{ width: "100%" }}>{t("faq.what-is-special.text")}</Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.is-it-official.title")}>
          <Typography style={{ width: "100%" }}>{t("faq.is-it-official.text")}</Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.which-risk-levels.title")}>
          <Box display="flex" flexDirection="column">
            <Typography>{t("faq.which-risk-levels.intro")}</Typography>
            <RiskHeading risk={1} />

            <Typography>{t("faq.which-risk-levels.level-1")}</Typography>

            <RiskHeading risk={2} />

            <Typography>{t("faq.which-risk-levels.level-2")}</Typography>
            <RiskHeading risk={3} />
            <Typography>{t("faq.which-risk-levels.level-3")}</Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                <ContactsMediumBackgroundIcon />
              </div>
              <Typography variant="h3" style={{ margin: "0 1rem" }}>
                {t("faq.which-risk-levels.increased-contact-behavior.title")}
              </Typography>
            </div>
            <Typography>{t("faq.which-risk-levels.increased-contact-behavior.text")}</Typography>
          </Box>
        </FaqAccordion>

        <FaqAccordion title={t("faq.consequences-of-risk-evaluation.title")}>
          <Typography style={{ width: "100%" }}>{t("faq.consequences-of-risk-evaluation.text")}</Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.how-up-to-date.title")}>
          <Typography style={{ width: "100%" }}>{t("faq.how-up-to-date.text")}</Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.which-data.title")}>
          <Typography style={{ width: "100%", whiteSpace: "break-spaces" }}>
            <Trans i18nKey="faq.which-data.text">
              part-0
              <a href="https://covapp.charite.de" target="_blank" rel="noopener">
                part-1
              </a>
              part-2
            </Trans>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.advantages.title")}>
          <Typography style={{ width: "100%" }} component="div">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className={classes.textBlock}>{t("faq.advantages.text-1")}</div>
              <div className={classes.textBlock}>{t("faq.advantages.text-2")}</div>
              <div className={classes.textBlock}>
                <Trans i18nKey="faq.advantages.text-3">
                  part-0
                  <a
                    href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2"
                    target="_blank"
                    rel="noopener"
                  >
                    part-1
                  </a>
                  part-2
                </Trans>
              </div>
              <div className={classes.textBlock}>{t("faq.advantages.text-4")}</div>
              <div className={classes.textBlock}>{t("faq.advantages.text-5")}</div>
              <div className={classes.textBlock}>{t("faq.advantages.text-6")}</div>
            </div>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.how-does-it-work.title")}>
          <Typography style={{ width: "100%" }}>{t("faq.how-does-it-work.text")}</Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.what-is-contact-index.title")}>
          <Typography style={{ width: "100%" }}>
            <Trans i18nKey="faq.what-is-contact-index.text">
              part-0
              <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2" target="_blank" rel="noopener">
                part-1
              </a>
              part-2
            </Trans>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.why-reduce-contacts.title")}>
          <Typography style={{ width: "100%" }}>
            <Trans i18nKey="faq.why-reduce-contacts.text">
              part-0
              <a
                href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Steckbrief.html"
                target="_blank"
                rel="noopener"
              >
                part-1
              </a>
              part-2
            </Trans>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.what-can-i-do.title")}>
          <Typography style={{ width: "100%" }}>
            <Trans i18nKey="faq.what-can-i-do.text">
              part-0
              <a
                href="https://www.infektionsschutz.de/coronavirus/alltag-in-zeiten-von-corona.html"
                target="_blank"
                rel="noopener"
              >
                part-1
              </a>
              part-2
              <a href="https://www.bundesregierung.de/breg-de/themen/corona-warn-app" target="_blank" rel="noopener">
                part-3
              </a>
              part-4
            </Trans>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title={t("faq.friendship-paradoxon.title")}>
          <Typography style={{ width: "100%" }}>
            <Trans i18nKey="faq.friendship-paradoxon.text">
              part-0
              <a href="https://de.wikipedia.org/wiki/Freundschaftsparadox" target="_blank" rel="noopener">
                part-1
              </a>
              part-2
            </Trans>
          </Typography>
        </FaqAccordion>
      </section>
    </main>
  );
};
