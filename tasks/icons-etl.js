// This task should be run whenever FontAwesome's package is updated. It's run
// as a standalone to prevent the roundtrip from slowing down the build process.

fs      = require('fs')
request = require('request')
yaml    = require('yamljs')

// Fetch the icons.yml file from the Github repo. This step is necessary
// because the file is ignored in the npm module, so we don't have it locally.
var iconYamlUrl = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/src/icons.yml'
var iconJson

request(iconYamlUrl, function (error, response, body) {

  if (!error && response.statusCode === 200) {

    // Transform the yaml to json.
    iconJson = yaml.parse(body)

    // Output it to the scripts directory.
    fs.writeFile('src/scripts/data.icons.json', JSON.stringify(iconJson, null, 2))
  }
})
