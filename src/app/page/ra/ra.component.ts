import { Component } from '@angular/core';
import {Modelos3D} from '../../model/model'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Component({
    selector: 'app-ra',
    imports: [],
    templateUrl: './ra.component.html',
    styleUrl: './ra.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class RaComponent {

  selectedStation: number = 0;
  supportsAR: boolean = true;


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


  modelos: Modelos3D[] = [
    { id: 1, nombre_modelo: 'Capibara', nombre_archivo: 'capibara.glb', ruta_archivo: 'assets/modelos/capibara.glb', id_estacion: 10 },
    { id: 2, nombre_modelo: 'Gallina', nombre_archivo: 'gallina.glb', ruta_archivo: 'assets/modelos/gallina.glb', id_estacion: 10 },
    { id: 3, nombre_modelo: 'Cerdo', nombre_archivo: 'cerdo.glb', ruta_archivo: 'assets/modelos/cerdo.glb', id_estacion: 11 },
    { id: 4, nombre_modelo: 'Conejo', nombre_archivo: 'conejo.glb', ruta_archivo: 'assets/modelos/conejo.glb', id_estacion: 11 },
    { id: 5, nombre_modelo: 'Filtro Anaerobio', nombre_archivo: 'filtro.glb', ruta_archivo: 'assets/modelos/filtro.glb', id_estacion: 12 },
    { id: 6, nombre_modelo: 'Tanque Decantador', nombre_archivo: 'tanque.glb', ruta_archivo: 'assets/modelos/tanque.glb', id_estacion: 12 }
  ];

  estaciones = [10, 11, 12];

  ngAfterViewInit() {
    if (!this.supportsAR) {
      setTimeout(() => this.renderFakeAR(), 0);
    }
  }

  async checkWebXRSupport() {
    if ('xr' in navigator) {
      try {
        this.supportsAR = await (navigator as any).xr.isSessionSupported('immersive-ar');
      } catch {
        this.supportsAR = false;
      }
    }
  }

  renderFakeAR() {
    this.modelos.forEach((modelo) => {
      if (modelo.id_estacion !== this.selectedStation) return;

      const container = document.getElementById(`falso-ar-${modelo.id}`);
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Cámara en vivo como fondo
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const videoTexture = new THREE.VideoTexture(video);
        const backgroundMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.MeshBasicMaterial({ map: videoTexture })
        );

        backgroundMesh.material.depthTest = false;
        backgroundMesh.material.depthWrite = false;

        const bgScene = new THREE.Scene();
        const bgCamera = new THREE.Camera();
        bgScene.add(backgroundMesh);

        // Cargar modelo
        const loader = new GLTFLoader();
        loader.load(modelo.ruta_archivo, (gltf) => {
          scene.add(gltf.scene);
          gltf.scene.position.z = -2;
        });

        camera.position.z = 2;

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.autoClear = false;
          renderer.clear();
          renderer.render(bgScene, bgCamera);
          renderer.render(scene, camera);
        };

        animate();
      });
    });
  }

}
