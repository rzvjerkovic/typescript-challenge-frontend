import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { API_URL } from 'src/app/app.config'

const TRANSIT_STOPS_SEGMENT = 'transit-stops'

@Injectable({ providedIn: 'root' })
export class TransitStopsService {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private httpClient: HttpClient
  ) {}

  deleteStop(stopId: string) {
    return this.httpClient.get<string[]>(`${this.apiUrl}/${TRANSIT_STOPS_SEGMENT}/${stopId}`)
  }
}
