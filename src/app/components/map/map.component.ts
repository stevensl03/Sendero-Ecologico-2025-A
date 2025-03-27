  import { Component } from '@angular/core';
  import { latLngBounds, Map, marker, tileLayer } from 'leaflet';


  @Component({
    selector: 'app-map',
    standalone: true,
    imports: [],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css'
  })
  export class MapComponent {

    ngAfterViewInit(): void {
      const bounds = latLngBounds(
        [4.0705, -73.5880], // Esquina suroeste
        [4.0785, -73.5795]  // Esquina noreste
      );
        const  map = new Map('map',{
          dragging: true, // Permitir arrastrar
          maxBounds: bounds, // Limitar el área visible
          maxBoundsViscosity: 1.0 // Evita que el usuario se salga del área
        }).setView([4.074, -73.5839], 17);
    
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          minZoom: 16,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);;
    
        marker([4.0748420, -73.5822120]).addTo(map).bindPopup("Estacion 10");
        marker([4.0750239, -73.5824561]).addTo(map).bindPopup("Estacion 11");
        marker([4.0757168, -73.5806617]).addTo(map).bindPopup("Estacion 12");
    
      }
    
  }
