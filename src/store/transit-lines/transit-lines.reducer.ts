import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { TransitLine } from 'src/types/line'
import { TransitLinesActions } from './transit-lines.actions'
import { localStorageService } from 'src/util/localStorage'

export const TRANSIT_LINES_KEY = 'transit-lines'

export interface TransitLinesState extends EntityState<TransitLine> {
  selectedStopId: string
  loading: boolean
  error: string
}

export const transitLinesAdapter = createEntityAdapter<TransitLine>()
export const transitLinesInitialState: TransitLinesState = transitLinesAdapter.getInitialState({
  selectedStopId: localStorageService.get('stopSelection'),
  loading: true,
  error: null,
})

const reducer = createReducer(
  transitLinesInitialState,

  on(TransitLinesActions.LoadLines, (state) => ({ ...state, loading: true, error: null })),
  on(TransitLinesActions.LoadLinesSuccess, (state, { lines }) => {
    return transitLinesAdapter.setAll(lines, {
      ...state,
      loading: false,
      error: null,
    })
  }),
  on(TransitLinesActions.LoadLinesFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(TransitLinesActions.AddLine, (state) => ({ ...state, loading: true, error: null })),
  on(TransitLinesActions.AddLineSuccess, (state, { line }) =>
    transitLinesAdapter.addOne(line, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(TransitLinesActions.AddLineFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(TransitLinesActions.SelectStop, (state, { selectedStopId }) => {
    return {
      ...state,
      selectedStopId,
    }
  })
)

export function transitLinesReducer(state: TransitLinesState | undefined, action: Action): TransitLinesState {
  return reducer(state, action)
}
