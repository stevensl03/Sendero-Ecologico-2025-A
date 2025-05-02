export interface Modelos3D {
  id: number;
  nombre_modelo: string;
  nombre_archivo: string;
  ruta_archivo: string;
  id_estacion: number;
}

export interface VideoEstacion {
  id: number;
  nombre: string;
  embedUrl: string;
  youtubeUrl: string;
}