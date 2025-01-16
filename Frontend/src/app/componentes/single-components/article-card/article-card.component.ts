import { Component, inject } from '@angular/core';
import { PublicacionService } from '../../../services/publicacion.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../interfaces/publicacion';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {

  constructor(private router: Router) {}

  //1. Injectamos servicios o dependencias necesarias

  _publicacionService = inject(PublicacionService);
  _toastrServices = inject(ToastrService);

  // 2. Declaramos las variables donde vamos a guardar las respuestas de la base de datos

  allPosts : Post[] = []

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


  //Funcion para redireccionar a la vista detallada de lun articulo por el id
  goToDetailView(id: string){
      this.router.navigate(['/blog-page/article', id])
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

  
  
}
