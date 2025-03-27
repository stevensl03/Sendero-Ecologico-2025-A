import { Component, input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component'
import {MapComponent} from './components/map/map.component'
import {StationDetailsComponent} from './components/station-details/station-details.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MenuComponent, MapComponent, StationDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;
  role = "visitante";
  isHomePage = false;
  isLogin = true;


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/';
    });
  }
}

