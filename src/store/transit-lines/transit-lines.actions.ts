import { createAction, props } from '@ngrx/store'
import { TransitLine, TransitStop } from 'src/types/line'

export namespace TransitLinesActions {
  export const LoadLines = createAction(`[TRANSIT LINES] Load lines`)
  export const LoadLinesSuccess = createAction(`[TRANSIT LINES] Load lines success`, props<{ lines: TransitLine[] }>())
  export const LoadLinesFailure = createAction(`[TRANSIT LINES] Load lines failure`, props<{ error: string }>())

  export const AddLine = createAction(`[TRANSIT LINES] Add a line`, props<{ line: TransitLine }>())
  export const AddLineSuccess = createAction(`[TRANSIT LINES] Add a line success`, props<{ line: TransitLine }>())
  export const AddLineFailure = createAction(`[TRANSIT LINES] Add a line failure`, props<{ error: string }>())

  export const SelectStop = createAction(`[TRANSIT LINES] Select a stop`, props<{ selectedStopId: string }>())

  export const DeleteStop = createAction(`[TRANSIT LINES] Delete a stop`, props<{ stopId: string }>())
  export const DeleteStopSuccess = createAction(`[TRANSIT LINES] Delete a stop success`, props<{ lineIds: string[] }>())
  export const DeleteStopFailure = createAction(`[TRANSIT LINES] Delete a stop failure`, props<{ error: string }>())

  export const AddStop = createAction(`[TRANSIT LINES] Add a stop`)
  export const SubmitAddStop = createAction(
    `[TRANSIT LINES] Submit add a stop`,
    props<{ lineId: string; stop: TransitStop; reference: string; position: 'after' | 'before' }>()
  )
  export const SubmitAddStopSuccess = createAction(`[TRANSIT LINES] Submit add a stop success`)
  export const SubmitAddStopFailure = createAction(
    `[TRANSIT LINES] Submit add a stop failure`,
    props<{ error: string }>()
  )
}
