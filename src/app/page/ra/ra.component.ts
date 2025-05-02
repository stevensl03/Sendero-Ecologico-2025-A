import { Component } from '@angular/core';
import {Modelos3D, VideoEstacion} from '../../model/model'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


@Component({
  selector: 'app-ra',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './ra.component.html',
  styleUrl: './ra.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 

})


export class RaComponent {

  selectedStation: number = 0;

  ngOnInit() {
    const rawStation = history.state.station;

    // Verifica si existe 'station' en history.state antes de intentar convertirlo
    if (rawStation !== undefined && rawStation !== null) {
      this.selectedStation = parseInt(rawStation, 10);

      if (isNaN(this.selectedStation)) {
        console.error('selectedStation no es un número válido:', rawStation);
      } else {
        console.log('selectedStation (int):', this.selectedStation);
      }
    } else {
      console.error('No se encontró el valor de station en el estado de navegación');
    }
  }

  openInYouTube(url: string): void {
    window.open(url, '_blank');
  }

  videos: VideoEstacion[] = [
    {
      id: 10,
      nombre: 'Estación Leones',
      embedUrl: 'https://www.youtube.com/embed/MGSALKM2VeI?rel=0&modestbranding=1&controls=1',
      youtubeUrl: 'https://www.youtube.com/watch?v=MGSALKM2VeI'
    },
    {
      id: 11,
      nombre: 'Estación Safari',
      embedUrl: 'https://www.youtube.com/embed/sPyAQQklc1s?rel=0&modestbranding=1&controls=1',
      youtubeUrl: 'https://www.youtube.com/watch?v=sPyAQQklc1s'
    },
    {
      id: 12,
      nombre: 'Estación Ciudad VR',
      embedUrl: 'https://www.youtube.com/embed/G_gmoSejUxU?rel=0&modestbranding=1&controls=1',
      youtubeUrl: 'https://www.youtube.com/watch?v=G_gmoSejUxU'
    }
  ];


  modelos: Modelos3D[] = [
    { id: 1, nombre_modelo: 'Capibara', nombre_archivo: 'capibara.glb', ruta_archivo: 'assets/modelos/capibara.glb', id_estacion: 10 },
    { id: 2, nombre_modelo: 'Gallina', nombre_archivo: 'gallina.glb', ruta_archivo: 'assets/modelos/gallina.glb', id_estacion: 10 },
    { id: 3, nombre_modelo: 'Cerdo', nombre_archivo: 'cerdo.glb', ruta_archivo: 'assets/modelos/cerdo.glb', id_estacion: 11 },
    { id: 4, nombre_modelo: 'Conejo', nombre_archivo: 'conejo.glb', ruta_archivo: 'assets/modelos/conejo.glb', id_estacion: 11 },
    { id: 5, nombre_modelo: 'Filtro Anaerobio', nombre_archivo: 'filtro.glb', ruta_archivo: 'assets/modelos/filtro.glb', id_estacion: 12 },
    { id: 6, nombre_modelo: 'Tanque Decantador', nombre_archivo: 'tanque.glb', ruta_archivo: 'assets/modelos/tanque.glb', id_estacion: 12 }
  ];

  estaciones = [10, 11, 12];

}
