import { Component } from '@angular/core';

@Component({
  selector: 'app-station-details',
  standalone: true,
  imports: [],
  templateUrl: './station-details.component.html',
  styleUrl: './station-details.component.css'
})
export class StationDetailsComponent {
  isClick10:boolean = false;
  isClick11:boolean = false;
  isClick12:boolean = false;
  selectedStation:number = 0;

}
