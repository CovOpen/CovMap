import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppApi } from "src/state/app";
import { useThunkDispatch } from "src/useThunkDispatch";

export const LazyError = () => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    dispatch(
      AppApi.setSnackbarMessage({
        text: t("lazy-error"),
        type: "error",
        duration: 30000,
      }),
    );
  }, []);

  return null;
};
