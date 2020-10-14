<div align="center" >
  <a href="https://github.com/alexanderthieme/CovMapper">
    <img style="height: 200px; width: auto;" src="https://github.com/alexanderthieme/CovMapper/raw/master/static/logo.png" alt="CovMap">
  </a>
</div>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/kommander"><img src="https://avatars2.githubusercontent.com/u/335157?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Sebastian Herrlinger</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=kommander" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alexanderthieme"><img src="https://avatars1.githubusercontent.com/u/61984544?v=4?s=50" width="50px;" alt=""/><br /><sub><b>alexanderthieme</b></sub></a><br /><a href="#business-alexanderthieme" title="Business development">💼</a></td>
    <td align="center"><a href="https://github.com/ChristianRomberg"><img src="https://avatars0.githubusercontent.com/u/25772118?v=4?s=50" width="50px;" alt=""/><br /><sub><b>ChristianRomberg</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=ChristianRomberg" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/m-pa"><img src="https://avatars0.githubusercontent.com/u/790655?v=4?s=50" width="50px;" alt=""/><br /><sub><b>m-pa</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=m-pa" title="Code">💻</a></td>
    <td align="center"><a href="https://kantimam.org/"><img src="https://avatars2.githubusercontent.com/u/24353308?v=4?s=50" width="50px;" alt=""/><br /><sub><b>kant imam</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=kantimam" title="Code">💻</a></td>
    <td align="center"><a href="https://startup-cto.net/"><img src="https://avatars2.githubusercontent.com/u/3396992?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Daniel Bartholomae</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=dbartholomae" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ChristophWersal"><img src="https://avatars0.githubusercontent.com/u/45358216?v=4?s=50" width="50px;" alt=""/><br /><sub><b>ChristophWersal</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=ChristophWersal" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/weltenwort"><img src="https://avatars3.githubusercontent.com/u/973741?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Felix Stürmer</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=weltenwort" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

Copyright 2020 http://covmap.de

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
