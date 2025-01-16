import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

    //1. INYECCIÓN DE DEPENDENCIAS ---------------------------------------
    private _httpClient = inject(HttpClient);

    // 2. RUTA DE CONEXIÓN CON EL BACKEND ---------------------------------
    private URL_PUBLICACIONES = 'http://localhost:9000/publicaciones';

    // Petición POST
  postPublicacion(publicacion:Post){
    return this._httpClient.post(this.URL_PUBLICACIONES + '/crear', publicacion);
  }

  // Petición GET
  getPublicacion(){
    return this._httpClient.get(this.URL_PUBLICACIONES + '/obtener');
  }

  // Petición GET
  getPublicacionById(id:string){
    return this._httpClient.get(this.URL_PUBLICACIONES + '/obtener/' + id);
  }

  // Petición PUT
  putPublicacion(publicacionActualizada:Post, id:string){
    // para actualizar debemos pasar el body y el id del producto a actualizar
    return this._httpClient.put(this.URL_PUBLICACIONES + '/actualizar/' + id, publicacionActualizada);
  }


  // Petición DELETE
  deletePublicacion(id:string){
    // la ruta esta conformada por: ruta generica + acción + id
    return this._httpClient.delete(this.URL_PUBLICACIONES + '/eliminar/' + id);
  }
}
