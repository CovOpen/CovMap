<div align="center" >
  <a href="https://covmap.de">
    <img style="height: 200px; width: auto;" src="https://github.com/CovOpen/CovMapper/raw/master/static/images/logo.png" alt="CovMap Logo">
  </a>
</div>

<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-19-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->

# CovMapper

A webapp to display large-scale epidemiological data and forecasts of the SARS-CoV-2 pandemic.

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

To generate test data for GeoJSONs you want to map your data on (like in _/data_), use the script at [`dev/generate-random-data-for-geojson.js`](./dev/generate-random-data-for-geojson.js).

```bash
node dev/generate-random-data-for-geojson --help
```

## Contributing

We use a shared `master` branch, with short lived feature branches. Create a branch, add your changes locally, use `git add X && git commit`, then create a Pull Request.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/kommander"><img src="https://avatars2.githubusercontent.com/u/335157?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Sebastian Herrlinger</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=kommander" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ChristianRomberg"><img src="https://avatars0.githubusercontent.com/u/25772118?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Christian Romberg</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=ChristianRomberg" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/m-pa"><img src="https://avatars0.githubusercontent.com/u/790655?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Patrick Matheis</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=m-pa" title="Code">💻</a></td>
    <td align="center"><a href="https://kantimam.org/"><img src="https://avatars2.githubusercontent.com/u/24353308?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Kantemir Imamov</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=kantimam" title="Code">💻</a></td>
    <td align="center"><a href="https://startup-cto.net/"><img src="https://avatars2.githubusercontent.com/u/3396992?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Daniel Bartholomae</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=dbartholomae" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ChristophWersal"><img src="https://avatars0.githubusercontent.com/u/45358216?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Christoph Wersal</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=ChristophWersal" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/weltenwort"><img src="https://avatars3.githubusercontent.com/u/973741?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Felix Stürmer</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=weltenwort" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ttobollik"><img src="https://avatars3.githubusercontent.com/u/6298068?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Theresa Tobollik</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=ttobollik" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/onouv"><img src="https://avatars2.githubusercontent.com/u/30532561?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Olaf Nouvortne</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=onouv" title="Code">💻</a></td>
    <td align="center"><a href="https://danielhabenicht.github.io/"><img src="https://avatars3.githubusercontent.com/u/13590797?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Daniel Habenicht</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=DanielHabenicht" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/mgrupp/"><img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light?s=50" width="50px;" alt=""/><br /><sub><b>Michael Grupp</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=" title="Code">💻</a></td>
    <td align="center"><a href="mailto:cornelia.furkert@googlemail.com"><img src="https://avatars3.githubusercontent.com/u/73227216?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Cornelia Furkert</b></sub></a><br /><a href="#design-zwischenmoment" title="Design">🎨</a> <a href="#userTesting-zwischenmoment" title="User Testing">📓</a> <a href="#mentoring-zwischenmoment" title="Mentoring">🧑‍🏫</a></td>
    <td align="center"><a href="https://www.louvard.de/CommitNRun/"><img src="https://avatars2.githubusercontent.com/u/9567496?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Éric Louvard</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=cnrun" title="Code">💻</a></td>
    <td align="center"><a href="http://www.manuel-blechschmidt.de/"><img src="https://avatars3.githubusercontent.com/u/457641?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Manuel Blechschmidt</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=ManuelB" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/baskle"><img src="https://avatars1.githubusercontent.com/u/53707554?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Bastian Klenow</b></sub></a><br /><a href="#design-baskle" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/sheraben"><img src="https://avatars3.githubusercontent.com/u/62461103?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Shéhérazade Benzerga</b></sub></a><br /><a href="#business-sheraben" title="Business development">💼</a></td>
    <td align="center"><a href="https://japhilko.github.io/mywebsite/"><img src="https://avatars1.githubusercontent.com/u/7593396?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Jan-Philipp Kolb</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=Japhilko" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/undheitergehts"><img src="https://avatars3.githubusercontent.com/u/73689859?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Felix Zimmermann</b></sub></a><br /><a href="#design-undheitergehts" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/jnnwnk"><img src="https://avatars2.githubusercontent.com/u/10629407?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Janna Wieneke</b></sub></a><br /><a href="https://github.com/CovOpen/CovMapper/commits?author=jnnwnk" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

> This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! Add them by referring to the [@all-contributers Bot](https://allcontributors.org/docs/en/bot/usage) or using the cli (`yarn all-contributers add <username> <emojikey>`).

---

Copyright 2020 http://covmap.de Licensed under the Apache License. Find the license [here](./LICENSE).
