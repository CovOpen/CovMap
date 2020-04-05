const { program } = require('commander');
const path = require('path');
const { writeFileSync, readFileSync } = require('fs');

program
  .version('0.1.0')
  .name("generate-random-data-for-geojson")
  .option('-o, --output <path>', 'Where to output the generated JSON relative to CWD (default: next to input file)')
  .arguments('<cmd> [geojsonfile]');

program.parse(process.argv);

const fileName = program.args[0];

if (!fileName) {
  throw new Error('Please specify a GeoJSON file path to generate random values for');
}

geojsonPath = path.resolve(process.cwd(), fileName);

let output;
if (program.output) {
  output = path.resolve(process.cwd(), program.output);
} else {
  const pathInfo = path.parse(geojsonPath);
  output = path.join(pathInfo.dir, `${pathInfo.name}.generated.json`);
}

const inputContent = readFileSync(geojsonPath)
const geojson = JSON.parse(inputContent);

const randomData = geojson.features.reduce((acc, data) => {
  Object.assign(acc.data, {
    [data.properties.PLZ99]: { coughs: getRandomInt(0, 100) }
  });

  return acc;
}, { types: { coughs: "Coughing Symptoms" }, data: {} })

writeFileSync(output, JSON.stringify(randomData));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}