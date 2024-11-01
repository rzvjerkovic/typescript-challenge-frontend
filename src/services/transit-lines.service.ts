import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { map } from 'rxjs'
import { API_URL } from 'src/app/app.config'
import { TransitLine, TransitStop } from 'src/types/line'

const TRANSIT_LINES_SEGMENT = 'transit-lines'

@Injectable({ providedIn: 'root' })
export class TransitLinesService {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private httpClient: HttpClient
  ) {}
  getLines() {
    return this.httpClient.get(`${this.apiUrl}/${TRANSIT_LINES_SEGMENT}/all`).pipe(
      map((lines) => {
        return Object.entries(lines).map(([key, value]) => ({ id: key, stops: value.stops }))
      })
    )
  }

  addStop(lineId: string, stop: TransitStop, reference: string, position: 'after' | 'before') {
    return this.httpClient.post<TransitLine>(`${this.apiUrl}/${TRANSIT_LINES_SEGMENT}/${lineId}/add-stop`, {
      stop,
      position,
      reference,
      lineId,
    })
  }

  addLine(line: TransitLine) {
    return this.httpClient.post<TransitLine>(`${this.apiUrl}/${TRANSIT_LINES_SEGMENT}`, line)
  }
}
