import { CircleLayerSpecification, LineLayerSpecification } from 'maplibre-gl'

export const MARKER_PAINT = {
  'circle-color': ['case', ['boolean', ['feature-state', 'highlight'], false], '#08EE08', '#222'],
  'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 1, 15, 8],
  'circle-stroke-opacity': 1,
  'circle-stroke-color': '#fff',
  'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 15, 2],
  'circle-opacity': 1,
} as CircleLayerSpecification['paint']

export const LINE_PAINT = {
  'line-color': '#FE0404',
  'line-width': 2,
} as LineLayerSpecification['paint']
