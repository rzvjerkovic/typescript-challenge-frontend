import { createFeatureSelector, createSelector } from '@ngrx/store'
import { GeoJSONSourceSpecification } from 'maplibre-gl'
import { TRANSIT_LINES_KEY, transitLinesAdapter, TransitLinesState } from './transit-lines.reducer'

export namespace fromTransitLines {
  export const transitLinesState = createFeatureSelector<TransitLinesState>(TRANSIT_LINES_KEY)

  export const { selectAll, selectEntities, selectIds } = transitLinesAdapter.getSelectors(transitLinesState)

  export const selectedStopId = createSelector(transitLinesState, (state) => state.selectedStopId)

  export const allStops = createSelector(selectAll, (lines) => lines.map((line) => line.stops).flat())

  export const selectedStop = createSelector(selectedStopId, allStops, (selStopId, stops) =>
    stops.find((stop) => stop.id === selStopId)
  )

  export const loading = createSelector(transitLinesState, (state) => state.loading)

  export const error = createSelector(transitLinesState, (state) => state.error)

  /**
   * Mapbox source for the locations
   */
  export const stopsPointGeoJson = createSelector(
    allStops,
    (stops) =>
      ({
        type: 'geojson',
        promoteId: '_id',
        data: {
          type: 'FeatureCollection',
          features: stops.map((stop) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [stop.lng, stop.lat] },
            properties: {
              peopleOn: stop.peopleOn,
              peopleOff: stop.peopleOff,
              reachablePopulationBike: stop.reachablePopulationBike,
              reachablePopulationWalk: stop.reachablePopulationWalk,
              _id: stop.id,
            },
          })),
        },
      }) as GeoJSONSourceSpecification
  )

  export const transitLinesGeoJson = createSelector(
    selectAll,
    (lines) =>
      ({
        type: 'geojson',
        promoteId: '_id',
        data: {
          type: 'FeatureCollection',
          features: lines
            .map((line) => {
              const connectors = []

              let currentStop = line.stops.find((stop) => stop.prevId === null)
              let counter = 0

              while (currentStop.nextId || counter < 2) {
                counter++
                const nextStop = line.stops.find((stop) => stop.id === currentStop.nextId)
                connectors.push({
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [currentStop.lng, currentStop.lat],
                      [nextStop.lng, nextStop.lat],
                    ],
                  },
                  properties: {
                    lineId: `${currentStop.id}-${nextStop.id}`,
                  },
                })
                currentStop = nextStop
              }

              return connectors
            })
            .flat(),
        },
      }) as GeoJSONSourceSpecification
  )
}
