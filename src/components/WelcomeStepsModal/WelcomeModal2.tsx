import React from "react";
import { Typography } from "@material-ui/core";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";
import { FullWidthFixedAspectImage } from "./FullWidthFixedAspectImage";
import { useTranslation } from "react-i18next";

export const WelcomeModal2: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();
  const { t } = useTranslation("common");

  return (
    <>
      <Typography className={classes.title}>{t("welcome.what-is-it.title")}</Typography>

      <FullWidthFixedAspectImage aspect={62.1} src="/images/WelcomeModalImage2.svg" alt="Welcome" />
      <div>
        <img src={"/images/WelcomeModalImage2_sub.svg"} alt="Welcome" width="124px" height="36px" />
      </div>
      <div className={classes.infoTextDiv}>
        <Typography className={classes.largeText}>{t("welcome.what-is-it.text")}</Typography>
      </div>
    </>
  );
};
