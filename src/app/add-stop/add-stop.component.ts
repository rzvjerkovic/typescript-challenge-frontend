import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { RootState } from 'src/store/app.store'

import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { TransitStop } from 'src/types/line'
import { fromTransitLines } from 'src/store/transit-lines/transit-lines.selectors'
import { MatIcon } from '@angular/material/icon'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-stop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.scss'],
  imports: [
    MatCardModule,
    MatIcon,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class AddStopComponent implements OnInit {
  stopForm: FormGroup

  readonly selectedStop: Signal<TransitStop>

  constructor(
    private fb: FormBuilder,
    private store: Store<RootState>,
    private router: Router
  ) {
    this.selectedStop = this.store.selectSignal(fromTransitLines.selectedStop)
    this.stopForm = this.fb.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      position: ['after', Validators.required],
      lineId: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.initializeFormValues()
  }

  initializeFormValues() {
    const { lat, lng } = this.selectedStop()
    this.stopForm.patchValue({
      lat,
      lng,
    })
  }

  onSubmit(): void {
    if (this.stopForm.valid) {
      const { position, lineId, ...stop } = this.stopForm.value
      this.store.dispatch(
        TransitLinesActions.SubmitAddStop({ stop, lineId, position, reference: this.selectedStop().id })
      )
    }
  }

  exitForm() {
    this.router.navigate(['detail'])
  }
}
