const { program } = require('commander');
const path = require('path');
const { writeFileSync, readFileSync } = require('fs');

program
  .version('0.1.0')
  .name("remove-geojson-props")
  .description('Remove feature props from a FeatureCollection')
  .option('-p, --props <props>', 'Comma separated list of props to remove')
  .option('-o, --output <path>', 'Where to output the generated JSON relative to CWD (default: next to input file)')
  .arguments('[GeoJSONPath]');

program.parse(process.argv);

const fromFile = program.args[0];

if (!fromFile) {
  console.warn('Error: Please specify a GeoJSON file path');
  program.help()
  process.exit();
}

const fromFilePath = path.resolve(process.cwd(), fromFile);

let output;
if (program.output) {
  output = path.resolve(process.cwd(), program.output);
} else {
  const pathInfo = path.parse(fromFilePath);
  output = path.join(pathInfo.dir, `${pathInfo.name}.removed${pathInfo.ext}`);
}

const fromJSON = loadGeoJson(fromFilePath);

if (!program.props) {
  console.warn('Error: Please specify a comma separated list of features to remove with the -p flag');
  program.help()
  process.exit();
}

const props = program.props.split(',').map(prop => prop.trim());

for(const feature of fromJSON.features) {
  for (const prop of props) {
    delete feature.properties[prop]
  }
}

writeFileSync(output, JSON.stringify(fromJSON));

console.log('Done.')

function loadGeoJson(absolutePath) {
  const inputContent = readFileSync(absolutePath);
  return JSON.parse(inputContent);
}