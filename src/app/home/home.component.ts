import { Component, OnInit, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../shared/types/housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  housingLocations: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocation[] = [];

  async getHousingLocationList() {
    const data = await this.housingService.getAllHousingLocations();
    this.housingLocations = data;
    this.filteredLocationList = data;
  }

  ngOnInit(): void {
    this.getHousingLocationList();
  }

  filterResults(keyword: string) {
    if (!keyword.trim()) {
      this.filteredLocationList = this.housingLocations;
      return;
    }

    this.filteredLocationList = this.housingLocations.filter(
      (housingLocation) =>
        housingLocation.city
          .toLocaleLowerCase()
          .includes(keyword.trim().toLocaleLowerCase())
    );
  }
}
