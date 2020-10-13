<div align="center" >
  <a href="https://github.com/alexanderthieme/CovMapper">
    <img style="height: 200px; width: auto;" src="https://github.com/alexanderthieme/CovMapper/raw/master/static/logo.png" alt="CovMap">
  </a>
</div>

# CovMap

A web app to display large-scale epidemiological data and forecasts of the SARS-CoV-2 pandemic.

## Development

We use Docker currently only to develop on different operating systems.
It is not necessarily needed, on unix like systems you can use _yarn_ scripts directly, like `yarn dev`.

### Docker for Unix like systems and Windows

```bash
cd ./CovMap
yarn install
docker-compose up
```

### Yarn for Unix like systems

```bash
cd ./CovMap
yarn dev
```


Then go to `https://localhost:8080` in your browser (if you are using docker you have to allow self-signed certificates in order to work)

### Test Data

To generate test data for GeoJSONs you want to map your data on (like in _/data_), use the script at `dev/generate-random-data-for-geojson.js`.

```bash
node dev/generate-random-data-for-geojson --help
```

## Contributing
We use a shared `master` branch, with short lived feature branches. Create a branch, add your changes locally, use `git add X && git commit`, then create a Pull Request.

---
Copyright 2020 http://covmap.de

Licensed under the Apache License. Find the license [here](./LICENSE).
