importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
)

const {registerRoute} = workbox.routing
const {CacheFirst} = workbox.strategies
const {CacheableResponse} = workbox.cacheableResponse

// Cache images
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    plugins: [new CacheableResponse({statuses: [0, 200]})],
  })
)

// Cache fonts
registerRoute(
  ({request}) => request.destination === 'font',
  new CacheFirst({
    plugins: [new CacheableResponse({statuses: [0, 200]})],
  })
)
