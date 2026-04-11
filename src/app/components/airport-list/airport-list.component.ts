import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';

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

  constructor(
    private readonly airportService: AirportService,
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAirports();
  }

  loadAirports(): void {
    this.errorMessage = '';
    this.isLoading = this.usesBackend;

    this.airportService
      .getAirports()
      .subscribe({
        next: (airports) => {
          this.ngZone.run(() => {
            this.airports = airports;
            this.isLoading = false;
            this.cdr.detectChanges();
          });
        },
        error: () => {
          this.ngZone.run(() => {
            this.airports = [];
            this.isLoading = false;
            this.errorMessage = 'Unable to load airport data from the backend. Please try again.';
            this.cdr.detectChanges();
          });
        }
      });
  }
}
