import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../shared/types/housinglocation';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  formBuilder: FormBuilder = inject(FormBuilder);

  housingLocation?: HousingLocation;

  applyForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
  });

  async getHousingLocationDetails(id: number) {
    const data = await this.housingService.getHousingLocationById(id);
    this.housingLocation = data;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const housingLocationId = Number(routeParams.get('id'));

    this.getHousingLocationDetails(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
