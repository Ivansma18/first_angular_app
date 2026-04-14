import { Component, computed, inject, signal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingService } from '../housing';
import { HousingLocationInfo } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocation],
  template: `
    <section>
      <input type="text" placeholder="Filter by city" (input)="onSearch($event)" />
    </section>

    <section class="results">
      @for (location of filteredLocations(); track $index) {
        <app-housing-location [housingLocation]="location" />
      }
    </section>
  `,
  styleUrls: ['home.css'],
})
export class Home {
  private housingService = inject(HousingService);

  locations = signal<HousingLocationInfo[]>([]);
  searchTerm = signal('');

  filteredLocations = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.locations().filter((loc) => loc.city.toLowerCase().includes(term));
  });
  constructor() {
    this.housingService.getAllHousingLocations().subscribe((data) => {
      this.locations.set(data);
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
