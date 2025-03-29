require('dotenv').config()

module.exports = {
  mapbox_token: process.env.MAPBOX_TOKEN,
  mapbox_style: process.env.MAPBOX_STYLE,
  mapbox_style_satellite: process.env.MAPBOX_STYLE_SATELLITE,
  google_maps_api_key: process.env.GOOGLE_MAPS_API_KEY,
  url: process.env.CONTEXT === 'deploy-preview' ? process.env.DEPLOY_PRIME_URL : process.env.URL,
}
