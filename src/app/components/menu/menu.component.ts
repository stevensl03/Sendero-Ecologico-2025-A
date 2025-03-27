import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input() menuOpen = false; // Recibe el estado del menú
  @Output() menuToggle = new EventEmitter<boolean>(); // Emite el cambio al padre

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuToggle.emit(this.menuOpen); // Envía el nuevo estado al padre
  }
}
