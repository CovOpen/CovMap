import React from "react";
import { Route } from "react-router-dom";

import type { AppPage } from "../app-config.types";


export const RenderPageRoute = ({ page }: { page: AppPage }) => {
  return (
    <Route
      path={page.route}
      key={page.id}
      component={() => (
        <div
          style={{
            zIndex: 1095,
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            flexShrink: 0,
            overflow: "hidden",
            paddingTop: "64px",
          }}
        >
          <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
            <page.Component />
          </div>
        </div>
      )}
      style={{ flex: "1 1 auto", position: "absolute" }}
    />
  );
}