// Purely declarative App customization
module.exports = {
  meta: {
    description: '...',
    keywords: '...'
  },
  map: {
    style: '...'
  }
  datasources: [{
    id: 'datasource-1',
    url: 'https://www.covmapper.com/data/custom-{date}.json',
  }, {
    id: 'datasource-2',
    url: 'https://www.covmapper.com/data?query={date}',
  }],
  visuals: [{
    name: 'This name will be visible in the dropdown',
    description: 'How does this visual show data',
    featureInfo: {
      mapping: {
        plz: 'PLZ',
        value: 'Symptom1',
        anotherProp: 'Some name'
      }
    },
    layers: [{
      id: 'layer-id'
      source: 'datasource-merged',
      type: 'line',
      paint: {
        'line-color': '#627BC1',
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          4,
          0
        ]
      }
    }, {
      id: 'layer-id'
      source: 'datasource-merged',
      type: 'line',
      paint: {
        'line-color': '#627BC1',
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          4,
          0
        ]
      }
    }],
    mappings: [{
      id: 'datasource-merged',
      geo: 'geo-1',
      datasource: 'datasource-1',
      geoProperty: 'plz',
      dataProperty: 'plz', 
    }]
  }],
  geos: [{
    id: 'geo-1',
    url: 'https://www.covmapper.com/geos/post-code-areas.json',
  }, {
    id: 'geo-2',
    url: 'https://www.covmapper.com/geos/post-code-points.json',
  }]
}