import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { STATIC_AIRPORTS } from '../data/airports.data';
import { Airport } from '../models/airport.model';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private readonly airportsUrl = `${environment.apiBaseUrl}/airports/getallairports`;

  constructor(private readonly http: HttpClient) {}

  getAirports(): Observable<Airport[]> {
    if (environment.useBackend) {
      return this.http.get<Airport[]>(this.airportsUrl);
    }

    return of(STATIC_AIRPORTS);
  }
}
