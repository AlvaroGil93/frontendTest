import { Component, inject } from '@angular/core';
import { PublicacionService } from '../../../services/publicacion.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../interfaces/publicacion';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card-admin',
  standalone: true,
  imports: [NgFor],
  templateUrl: './article-card-admin.component.html',
  styleUrl: './article-card-admin.component.css'
})
export class ArticleCardAdminComponent {

  constructor(private router: Router) {}

  //1. Injectamos servicios o dependencias necesarias

  _publicacionService = inject(PublicacionService);
  _toastrServices = inject(ToastrService);

  // 2. Declaramos las variables donde vamos a guardar las respuestas de la base de datos

  allPosts : Post[] = []

  token: string | null  = "";
  

  //3. Creamos los metodos para las peticiones http al backend

  getPosts(){

    this._publicacionService.getPublicacion().subscribe({
      next: (res: any) => {
        // Si funciona
        console.log(res);
        this.allPosts = res
        
      },
      error: (error: any) => {
        //Si no funciona
        console.log(error);
        
      }
    })

  }
  //Funcion para eliminar un articulo
  deletePostById(id:string){
    console.log("ID for Delete", id);
    
    this._publicacionService.deletePublicacion(id).subscribe({
      next: (res: any) => {
        console.log(res);
        alert("Se eliminó el articulo")
      },
      error: (error: any) => {
          //Si no funciona
          alert("No se pudo eliminar")
        console.log(error);
      }
    })
  }

  //Funcion para redireccionar a la vista detallada de lun articulo por el id
  goToDetailView(id: string){
    
      this.token = localStorage.getItem("token") ?? "null"; 
      window.location.href = `http://localhost:5173/article-edition-view/?article-id=${id}&token=${this.token}&action=${"edit"}`
      // this.router.navigate(['http://localhost:5173/', id])
  }

  //Al montarse ejecutamos la funcion
  ngOnInit() {
    this.getPosts();
  }

  // getPostById(){
    
  // }

  // createPost(){
    
  // }

  // updatePost(){
    
  // }

  // deletePost(){
    
  // }
}
