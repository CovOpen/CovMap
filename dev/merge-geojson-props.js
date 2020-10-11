const { program } = require("commander");
const path = require("path");
const { writeFileSync, readFileSync } = require("fs");

program
  .version("0.1.0")
  .name("merge-geojson-props")
  .description("Merge feature props from one FeatureCollection GeoJSON into another")
  .option("-p, --props <props>", "Comma separated list of properties to merge")
  .option("-o, --output <path>", "Where to output the generated JSON relative to CWD (default: next to input file)")
  .option("-m, --match <propertyName>", "Which property is used for identifying a feature in both files(default: id)")
  .option("-i, --info", "Output the identity property of missed features")
  .option("-r, --reverse", "Reverse merged array props")
  .arguments("[fromGeoJSON] [intoGeoJSON]");

program.parse(process.argv);

const fromFile = program.args[0];
const intoFile = program.args[1];

if (!fromFile || !intoFile) {
  console.warn("Error: Please specify two GeoJSON file paths");
  program.help();
  process.exit();
}

const fromFilePath = path.resolve(process.cwd(), fromFile);
const intoFilePath = path.resolve(process.cwd(), intoFile);

let output;
if (program.output) {
  output = path.resolve(process.cwd(), program.output);
} else {
  const pathInfo = path.parse(intoFilePath);
  output = path.join(pathInfo.dir, `${pathInfo.name}.merged${pathInfo.ext}`);
}

const fromJSON = loadGeoJson(fromFilePath);
const intoJSON = loadGeoJson(intoFilePath);

let matchProperty = "id";
if (program.match) {
  matchProperty = program.match;
}

if (!program.props) {
  console.warn("Error: Please specify a comma separated list of features to merge with the -p flag");
  program.help();
  process.exit();
}

const props = program.props.split(",").map((prop) => prop.trim());

let matchedFeatures = 0;
let missedFeatures = [];

for (const intoFeature of intoJSON.features) {
  const fromFeature = fromJSON.features.find(
    (candidate) => candidate.properties[matchProperty] === intoFeature.properties[matchProperty],
  );

  if (fromFeature) {
    matchedFeatures++;

    for (const prop of props) {
      const fProp = fromFeature.properties[prop];
      if (program.reverse && Array.isArray(fProp)) {
        fProp.reverse();
      }
      intoFeature.properties[prop] = fProp;
    }
  } else {
    missedFeatures.push(intoFeature.properties[matchProperty]);
  }
}

writeFileSync(output, JSON.stringify(intoJSON));

console.log(`Done. \nMatched: ${matchedFeatures} features\nMissed: ${missedFeatures.length} features`);

if (program.info) {
  console.log("Missed Features identity properties:");
  console.log(JSON.stringify(missedFeatures));
}

function loadGeoJson(absolutePath) {
  const inputContent = readFileSync(absolutePath);
  return JSON.parse(inputContent);
}
