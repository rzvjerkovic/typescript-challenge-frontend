import { ChangeDetectionStrategy, Component, effect, ElementRef, OnInit, Signal, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { GeoJSONSource, Map } from 'maplibre-gl'
import { LINE_PAINT, MARKER_PAINT } from 'src/constants/marker-paint'
import { environment } from 'src/environments/environment'
import { RootState } from 'src/store/app.store'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import { fromTransitLines } from 'src/store/transit-lines/transit-lines.selectors'
import { TransitStop } from 'src/types/line'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true }) private mapRef: ElementRef<HTMLElement>

  private map: Map
  readonly selectedStop: Signal<TransitStop>
  selectedStopId: string

  STOPS_SOURCE_ID = 'stops-source'

  constructor(private store: Store<RootState>) {
    this.selectedStop = this.store.selectSignal(fromTransitLines.selectedStop)

    effect(() => {
      const selectedStop = this.selectedStop()

      if (this.map.loaded()) {
        this.highlightStop(selectedStop?.id)
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(TransitLinesActions.LoadLines())

    this.map = new Map({
      center: { lat: 52.52, lng: 13.4 },
      zoom: 10,
      container: this.mapRef.nativeElement,
      style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${environment.maptilerApiKey}`,
    })

    this.map.once('load', () => {
      this.setupLinesLayer()
      this.setupStopsLayer()

      if (this.selectedStop() !== undefined) {
        this.highlightStop(this.selectedStop().id)
      }
    })
  }

  setupStopsLayer() {
    const stopsSource$ = this.store.pipe(select(fromTransitLines.stopsPointGeoJson))

    const STOPS_LAYER_ID = 'stops-layer'

    stopsSource$.subscribe((source) => {
      const exsitingSource = this.map.getSource(this.STOPS_SOURCE_ID) as GeoJSONSource
      if (exsitingSource) {
        exsitingSource.setData(source.data)
      } else {
        this.map.addSource(this.STOPS_SOURCE_ID, source)
      }
    })

    this.map.addLayer({ type: 'circle', source: this.STOPS_SOURCE_ID, id: STOPS_LAYER_ID, paint: MARKER_PAINT })

    this.map.on('click', STOPS_LAYER_ID, (e) => {
      const id = e.features[0].id
      if (id) {
        this.store.dispatch(TransitLinesActions.SelectStop({ selectedStopId: String(id) }))
      }
    })

    this.map.on('mouseenter', STOPS_LAYER_ID, () => {
      this.map.getCanvas().style.cursor = 'pointer'
    })

    this.map.on('mouseleave', STOPS_LAYER_ID, () => {
      this.map.getCanvas().style.cursor = ''
    })
  }

  highlightStop(featureId: string) {
    if (this.selectedStopId != null) {
      this.map.setFeatureState({ source: this.STOPS_SOURCE_ID, id: this.selectedStopId }, { highlight: false })
    }
    this.selectedStopId = featureId
    this.map.setFeatureState({ source: this.STOPS_SOURCE_ID, id: featureId }, { highlight: true })
  }
  setupLinesLayer() {
    const linesSource$ = this.store.pipe(select(fromTransitLines.transitLinesGeoJson))
    const LINES_SOURCE_ID = 'lines-source'
    const LINES_LAYER_ID = 'lines-layer'

    linesSource$.subscribe((source) => {
      const existingSource = this.map.getSource(LINES_SOURCE_ID) as GeoJSONSource
      if (existingSource) {
        existingSource.setData(source.data)
      } else {
        this.map.addSource(LINES_SOURCE_ID, source)
      }
    })

    this.map.addLayer({ type: 'line', source: LINES_SOURCE_ID, id: LINES_LAYER_ID, paint: LINE_PAINT })
  }
}
