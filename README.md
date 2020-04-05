# CovMapper

A web service to display large-scale epidemiological data and forecasts of the SARS-CoV-2 pandemic.

## Development

We use Docker currently only to develop on different operating systems.
It is not necessarily needed, on unix like systems you can use _yarn_ scripts directly, like `yarn dev`

### Docker for Unix like systems

```bash
cd ./CovMapper
yarn install
docker-compose up
```

### Yarn for Unix like systems

```bash
cd ./CovMapper
yarn dev
```

Then go to `https://localhost:8080` in your browser (if you are using docker you have to allow self-signed certificates in order to work)

## Requirements for v1.0

MUST:

- Show map of Germany with colored postal code areas
- Timeline bar: Selection of day and automatic update of map
- Selection for type of displayed data (e.g. confirmed cases, deaths)
- does not rely on 3rd party maps, e.g. MapBox
- uses efficient encoding of zip code areas, e.g. TopoJSON

IMPORTANT:

- Displaying of further graphs, e.g. infections vs time
- Displaying of further tables, e.g. infections vs state or zip code

NICE TO HAVE:

- Addition of further countries
- Multilingual
