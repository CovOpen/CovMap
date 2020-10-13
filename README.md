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

For fast _Hackathon like_ sprints, we use the shared `develop` branch. Add your changes locally, use `git add X && git commit` **then** use `git pull --rebase` **before you push** and resolve possible conflicts locally, then `git push`.

---
Copyright 2020 http://covmap.de

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
