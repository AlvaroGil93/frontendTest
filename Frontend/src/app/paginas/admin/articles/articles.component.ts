import { Component } from '@angular/core';
import { ArticleCardAdminComponent } from '../../../componentes/single-components/article-card-admin/article-card-admin.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ArticleCardAdminComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

}
