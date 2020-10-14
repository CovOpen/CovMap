<div align="center" >
  <a href="https://covmap.de" target="_blank" rel="noopener noreferrer">
    <img style="height: 200px; width: auto;" src="https://github.com/alexanderthieme/CovMapper/raw/master/static/logo.png" alt="CovMap">
  </a>
</div>

# CovMap

A web app to display large-scale epidemiological data and forecasts of the SARS-CoV-2 pandemic.

## Development

We use Docker currently only to develop on different operating systems.
It is not necessarily needed, on unix like systems you can use _yarn_ scripts directly, like `yarn dev`.

```bash
cd ./CovMap
# If you don't want to setup yarn locally:
docker-compose up
# If you want to develop on your system:
yarn install
yarn dev
```

Then go to [`https://localhost:8080`](https://localhost:8080) in your browser (if you are using docker you have to allow self-signed certificates in order to work)

### Test Data

To generate test data for GeoJSONs you want to map your data on (like in _/data_), use the script at `dev/generate-random-data-for-geojson.js`.

```bash
node dev/generate-random-data-for-geojson --help
```

## Contributing

We use a shared `master` branch, with short lived feature branches. Create a branch, add your changes locally, use `git add X && git commit`, then create a Pull Request.

---

Licensed under the Apache License. Find the license [here](./LICENSE).
