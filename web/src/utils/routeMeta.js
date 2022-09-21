const turf = require('@turf/turf')

const routeMeta = (coordinates) => {
  let elevation = null
  let totalDistance = 0
  let elevationGain = 0
  let elevationLoss = 0

  elevation = coordinates.map(
    (gpxPoint, idx, elevations) => {
      const prevGPXPoint = elevations[idx - 1]
      let distanceDiff = 0

      if (idx > 0) {
        const from = turf.point([prevGPXPoint[0], prevGPXPoint[1]])
        const to = turf.point([gpxPoint[0], gpxPoint[1]])
        distanceDiff = turf.distance(from, to)

        const elevationDiff = gpxPoint[2] - prevGPXPoint[2]
        if (elevationDiff >= 0) {
          elevationGain += elevationDiff
        } else {
          elevationLoss -= elevationDiff
        }
      }
      totalDistance += distanceDiff

      return {
        x: Number(totalDistance.toFixed(2)),
        y: Number(gpxPoint[2].toFixed(0)),
      }
    }
  )

  return ({
    elevation, 
    totalDistance,
    elevationGain,
    elevationLoss
  })
}

module.exports = routeMeta
