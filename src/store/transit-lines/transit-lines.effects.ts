import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators'
import { TransitLinesActions } from './transit-lines.actions'
import { TransitLinesService } from 'src/services/transit-lines.service'
import { of } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { localStorageService } from 'src/util/localStorage'
import { TransitStopsService } from 'src/services/transit-stops.service'

@Injectable()
export class TransitLinesEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private transitLinesService: TransitLinesService,
    private transitStopsService: TransitStopsService
  ) {}

  getLines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.LoadLines),
      switchMap(() =>
        this.transitLinesService.getLines().pipe(
          map((lines) => {
            return TransitLinesActions.LoadLinesSuccess({ lines })
          }),
          catchError((error: HttpErrorResponse) => {
            return of(TransitLinesActions.AddLineFailure({ error: error.error.message }))
          })
        )
      )
    )
  )

  navigateOnSelect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransitLinesActions.SelectStop),
        map((action) => {
          const selectedStopId = action.selectedStopId
          selectedStopId
            ? localStorageService.add('stopSelection', selectedStopId)
            : localStorageService.remove('stopSelection')

          return selectedStopId
        }),
        tap((selectedStopId) => (selectedStopId ? this.router.navigate(['detail']) : this.router.navigate(['home'])))
      ),
    { dispatch: false }
  )

  addStop$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransitLinesActions.AddStop),
        tap(() => this.router.navigate(['add-stop']))
      ),
    { dispatch: false }
  )

  submitAddStop$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransitLinesActions.SubmitAddStop),
        mergeMap(({ stop, lineId, reference, position }) =>
          this.transitLinesService.addStop(lineId, stop, reference, position).pipe(
            map(() => {
              return TransitLinesActions.SubmitAddStopSuccess()
            }),
            catchError((error: HttpErrorResponse) => {
              return of(TransitLinesActions.SubmitAddStopFailure({ error: error.error.message }))
            })
          )
        )
      ),
    { dispatch: true }
  )

  submitAddStopSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.SubmitAddStopSuccess),
      mergeMap(() => of(TransitLinesActions.LoadLines())),
      tap(() => this.router.navigate(['detail']))
    )
  )

  deleteStop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.DeleteStop),
      mergeMap((action) =>
        this.transitStopsService.deleteStop(action.stopId).pipe(
          map((lineIds: any) => {
            return TransitLinesActions.DeleteStopSuccess({ lineIds: lineIds })
          }),
          catchError((error: HttpErrorResponse) => {
            return of(TransitLinesActions.DeleteStopFailure({ error: error.error.message }))
          })
        )
      )
    )
  )

  deleteStopSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.DeleteStopSuccess),
      mergeMap(() => of(TransitLinesActions.LoadLines()))
    )
  )

  addLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.AddLine),
      mergeMap((action) =>
        this.transitLinesService.addLine(action.line).pipe(
          map((line) => TransitLinesActions.AddLineSuccess({ line })),
          catchError((error: HttpErrorResponse) => {
            return of(TransitLinesActions.AddLineFailure({ error: error.error.message }))
          })
        )
      )
    )
  )
}
