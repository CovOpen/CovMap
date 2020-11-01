import { Button, Grid, makeStyles, Paper, ThemeProvider, Typography } from "@material-ui/core";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store } from "./state";
import { theme } from "./theme";
import { Translation } from "react-i18next";

const root = document.getElementById("app");
const persistor = persistStore(store);

export default class ErrorBoundary extends React.Component<
  any,
  { hasError: boolean; error: Error | null; errorInfo: any }
> {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: "", hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error: error, errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      const state = this.state;
      return (
        <ThemeProvider theme={theme}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <div>
              <Typography variant="h2">
                <Translation>{(t) => <p>{t("common:error.title")}</p>}</Translation>
              </Typography>
            </div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                window.location.reload();
              }}
              style={{
                margin: theme.spacing(2),
              }}
            >
              <Translation>{(t) => <p>{t("common:error.reload-button")}</p>}</Translation>
            </Button>
            <Paper style={{ width: "90vw" }}>
              <Grid container spacing={3} style={{ padding: theme.spacing(1) }}>
                <Grid
                  item
                  xs={12}
                  style={{
                    padding: theme.spacing(2),
                  }}
                >
                  <Typography variant="h3">
                    <Translation>{(t) => <p>{t("common:error.share-description")}</p>}</Translation>
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    href="https://github.com/CovOpen/CovMapper/issues/new/choose"
                    target="_blank"
                    rel="noopener"
                    style={{
                      margin: "8px",
                    }}
                  >
                    <Translation>{(t) => <p>{t("common:error.share-button-github")}</p>}</Translation>
                  </Button>
                </Grid>
                <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    href="https://twitter.com/CovMap"
                    target="_blank"
                    rel="noopener"
                    style={{
                      margin: "8px",
                    }}
                  >
                    <Translation>{(t) => <p>{t("common:error.share-button-twitter")}</p>}</Translation>
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    padding: theme.spacing(2),
                    whiteSpace: "pre",
                  }}
                >
                  <details>
                    <summary>
                      <Typography component="span" variant="body2">
                        <Translation>{(t) => <p>{t("common:error.share-description-error-details")}</p>}</Translation>
                      </Typography>
                    </summary>
                    <Typography variant="body1">{state.error?.message}</Typography>
                    <Typography variant="body1">{state.error?.stack}</Typography>
                  </details>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </ThemeProvider>
      );
    }

    return this.props.children;
  }
}

render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <App />
    </Provider>
  </ErrorBoundary>,
  root,
);
