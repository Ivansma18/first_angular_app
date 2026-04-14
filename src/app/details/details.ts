import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing';
import { HousingLocationInfo } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <article *ngIf="housingLocation() as location">
      <img
        class="listing-photo"
        [src]="location.photo"
        alt="Exterior photo of {{ location.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ location.name }}</h2>
        <p class="listing-location">{{ location.city }}, {{ location.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ location.availableUnits }}</li>
          <li>Does this location have wifi: {{ location.wifi }}</li>
          <li>Does this location have laundry: {{ location.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.css'],
})
export class Details {
  private route = inject(ActivatedRoute);
  private housingService = inject(HousingService);

  housingLocation = signal<HousingLocationInfo | null>(null);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const id = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(id).subscribe((data) => {
      this.housingLocation.set(data);
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
