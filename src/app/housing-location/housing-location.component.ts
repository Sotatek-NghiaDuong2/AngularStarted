import { Component, Input } from '@angular/core';
import { HousingLocation } from '../shared/types/housinglocation';
import { IconLocationComponent } from '../shared/icons/icon-location/icon-location.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [IconLocationComponent, RouterModule],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
