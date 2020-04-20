import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";

export const Welcome = () => {
  return (
    <>
      <main>
        <div id="info">
          <div className="text">
            <Typography variant="h1">Infektionsrisiko von COVID-19 gering halten</Typography>
          </div>
          <div className="btn-group">
            <Button variant="contained" color="primary" ><Link style={{ textDecoration: 'none' }} to="/about">Infos</Link></Button>
            <Button variant="contained" color="secondary" ><Link style={{ textDecoration: 'none' }} to="/">Karte</Link></Button>
          </div>
        </div>
      </main>
    </>
  );
};
