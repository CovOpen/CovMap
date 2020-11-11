import React from "react";
import { Typography } from "@material-ui/core";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";
import { FullWidthFixedAspectImage } from "./FullWidthFixedAspectImage";
import { useTranslation } from "react-i18next";

export const WelcomeModal3: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();
  const { t } = useTranslation("common");

  return (
    <>
      <Typography className={classes.title}>{t("welcome.what-does-it-show.title")}</Typography>

      <FullWidthFixedAspectImage aspect={62.1} src="/images/WelcomeModalImage3.svg" alt="Welcome" />
      <div>
        <img src={"/images/WelcomeModalImage3_sub.svg"} alt="Welcome" width="113px" height="46px" />
      </div>
      <div className={classes.infoTextDiv}>
        <Typography className={classes.largeText}>{t("welcome.what-does-it-show.text")}</Typography>
        <Typography className={classes.smallText} style={{ marginTop: "20px" }}>
          {t("welcome.what-does-it-show.normal-risk")}
        </Typography>
        <Typography className={classes.smallText}>{t("welcome.what-does-it-show.medium-risk")}</Typography>
        <Typography className={classes.smallText}>{t("welcome.what-does-it-show.high-risk")}</Typography>
      </div>
    </>
  );
};
