const { program } = require("commander");
const path = require("path");
const { writeFileSync, readFileSync } = require("fs");
const { formatNowMinusDays } = require("../src/lib/formatUTCDate");

program
  .version("0.1.0")
  .name("generate-random-data-for-geojson")
  .option("-d, --days <amount>", "Generate the given amount of daily random data")
  .option("-o, --output <path>", "Where to output the generated JSON relative to CWD (default: next to input file)")
  .option("-p, --property <name>", "Which property is used for identifying a feature (default: PLZ99)")
  .arguments("<cmd> [geojsonfile]");

program.parse(process.argv);

const fileName = program.args[0];

if (!fileName) {
  throw new Error("Please specify a GeoJSON file path to generate random values for");
}

geojsonPath = path.resolve(process.cwd(), fileName);
const inputContent = readFileSync(geojsonPath);
const geojson = JSON.parse(inputContent);

let output;
if (program.output) {
  output = path.resolve(process.cwd(), program.output);
} else {
  const pathInfo = path.parse(geojsonPath);
  output = path.join(pathInfo.dir, `${pathInfo.name}.generated.json`);
}

let propertyName = "PLZ99";
if (program.property) {
  propertyName = program.property;
}

if (program.days) {
  const numDays = parseInt(program.days);
  if (!numDays) {
    throw new Error("Days need to be a positive integer");
  }
  const pathInfo = path.parse(geojsonPath);

  for (let day = 0; day < numDays; day += 1) {
    const dayOutput = path.join(pathInfo.dir, `${pathInfo.name}.generated.${formatNowMinusDays(day)}.json`);
    const randomData = randomDataForJson(geojson, propertyName);
    writeFileSync(dayOutput, JSON.stringify(randomData));
  }
} else {
  const randomData = randomDataForJson(geojson, propertyName);
  writeFileSync(output, JSON.stringify(randomData));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDataForJson(json, propertyName) {
  return json.features.reduce(
    (acc, data) => {
      Object.assign(acc.data, {
        [data.properties[propertyName]]: { coughs: getRandomInt(0, 100) },
      });

      return acc;
    },
    { types: { coughs: "Coughing Symptoms" }, data: {} },
  );
}
