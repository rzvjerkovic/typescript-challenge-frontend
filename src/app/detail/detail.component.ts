import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Store } from '@ngrx/store'
import { RootState } from 'src/store/app.store'
import { MatListModule } from '@angular/material/list'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import { fromTransitLines } from 'src/store/transit-lines/transit-lines.selectors'
import { TransitStop } from 'src/types/line'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconButton, MatIcon, MatListModule, CommonModule],
})
export class DetailComponent {
  readonly selectedStop: Signal<TransitStop>
  readonly stopName: Signal<string>

  constructor(private store: Store<RootState>) {
    this.selectedStop = this.store.selectSignal(fromTransitLines.selectedStop)
    this.stopName = computed(() => this.selectedStop()?.name || 'No selection')
  }

  clearSelection(): void {
    this.store.dispatch(TransitLinesActions.SelectStop({ selectedStopId: null }))
  }

  onDelete() {
    this.store.dispatch(TransitLinesActions.DeleteStop({ stopId: this.selectedStop().id }))
  }

  onAdd() {
    this.store.dispatch(TransitLinesActions.AddStop())
  }
}
