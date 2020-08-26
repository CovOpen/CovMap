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

### Docker for Unix like systems

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

For fast _Hackathon like_ sprints, we use the shared `develop` branch. Add your changes locally, use `git add X && git commit` __then__ use `git pull --rebase` __before you push__ and resolve possible conflicts locally, then `git push`.

## Requirements for v1.0

MUST:

- Show map of Germany with colored district areas
- Timeline bar: Selection of day and automatic update of map
- Selection for type of displayed data (e.g. confirmed cases, deaths)
- uses efficient encoding of zip code areas, e.g. TopoJSON
- can ask users for symptoms

IMPORTANT:

- Displaying of further graphs, e.g. infections vs time
- Displaying of further tables, e.g. infections vs state or zip code

NICE TO HAVE:

- Addition of further countries
- Multilingual
- does not rely on 3rd party maps, e.g. MapBox
