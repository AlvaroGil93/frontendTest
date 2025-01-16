import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../interfaces/publicacion';
import { PublicacionService } from '../../../services/publicacion.service';

@Component({
  selector: 'app-edit-articles',
  standalone: true,
  imports: [],
  templateUrl: './edit-articles.component.html',
  styleUrl: './edit-articles.component.css'
})
export class EditArticlesComponent {
     constructor(private route: ActivatedRoute) {}
    
      _publicacionService = inject(PublicacionService);
      
    
      route_param: string | null = "";
      id: string = "";
      html_content: string = "";
    
      publicacion : Post = {
        _id: '',
        title: '',
        image_url: "",
        description: "",
        content: '',
        author: '',
        category: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    
      getPostById(){
    
        this._publicacionService.getPublicacionById(this.id).subscribe({
          next: (res: any) => {
            // Si funciona
            this.publicacion = res
            this.html_content = res.content
            console.log("RES", res);
            console.log(this.html_content)
            
          },
          error: (error: any) => {
            //Si no funciona
            console.log(error);
            
          }
        })
    
      }
      
      getIdFromUrl() {
         this.route.paramMap.subscribe(params => {
    
          this.route_param = params.get('id')
          this.id =  this.route_param ? this.route_param : "";
    
          console.log("ID", this.id);
          
          if (this.id) {
            this.getPostById()
          } else {
            return alert("No se proporcionó un id")
          }
          
        });
      }
    
      ngOnInit() {
        this.getIdFromUrl()
      }
}
