import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';

@Component({
    selector: 'app-station-details',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './station-details.component.html',
    styleUrl: './station-details.component.css'
})

export class StationDetailsComponent {
  isClick10:boolean = false;
  isClick11:boolean = false;
  isClick12:boolean = false;
  selectedStation:number = 0;

  constructor(private router: Router) {}

  goToRa() {
    this.router.navigate(['/ra'], {
      state: { station: this.selectedStation }
    });
  }
}
