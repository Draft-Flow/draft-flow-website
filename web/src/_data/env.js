require('dotenv').config()

module.exports = {
  mapbox_token: process.env.MAPBOX_TOKEN,
  mapbox_style: process.env.MAPBOX_STYLE,
  mapbox_style_satellite: process.env.MAPBOX_STYLE_SATELLITE,
  url: process.env.URL,
}
