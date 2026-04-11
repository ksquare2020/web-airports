import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Airport } from '../../models/airport.model';
import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-airport-list',
  standalone: false,
  templateUrl: './airport-list.component.html',
  styleUrl: './airport-list.component.css'
})
export class AirportListComponent implements OnInit {
  airports: Airport[] = [];
  errorMessage = '';
  isLoading = false;
  readonly usesBackend = environment.useBackend;

  constructor(private readonly airportService: AirportService) {}

  ngOnInit(): void {
    this.loadAirports();
  }

  loadAirports(): void {
    this.errorMessage = '';
    this.isLoading = this.usesBackend;

    this.airportService
      .getAirports()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (airports) => {
          this.airports = airports;
        },
        error: () => {
          this.airports = [];
          this.errorMessage = 'Unable to load airport data from the backend. Please try again.';
        }
      });
  }
}
