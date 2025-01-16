//importamos los componentes pagina

import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { LoginComponent } from './paginas/login/login.component';
import { AdminComponent } from './paginas/admin/admin.component';
import { NoFoundComponent } from './paginas/no-found/no-found.component';
import { ArticlesComponent } from './paginas/admin/articles/articles.component';
import { EditArticlesComponent } from './paginas/admin/edit-articles/edit-articles.component';
import { UsuariosComponent } from './paginas/admin/usuarios/usuarios.component';
import { BlogComponent } from './paginas/blog/blog.component';
import { ArticleComponent } from './paginas/blog/article/article.component';
import { MeetingsComponent } from './paginas/blog/meetings/meetings.component';
import { AboutUsComponent } from './paginas/about-us/about-us.component';
import { PerfilUserComponent } from './paginas/perfil-user/perfil-user.component';
import { authGuard } from './guards/auth.guard';
//aca nos creamos las rutas para cada componente pagina
export const routes: Routes = [
  { path: '', component: InicioComponent, title: 'inicio' },
  { path: 'perfil-user', component: PerfilUserComponent, title: 'perfil-user' },
  { path: 'registro', component: RegistroComponent, title: 'registro' },
  { path: 'login', component: LoginComponent, title: 'inicio Sesion' },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Panel admin',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'articles', component: ArticlesComponent, title: 'articles' },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        title: 'registro de usuarios',
      },
      {
        path: 'edit-articles/:id',
        component: EditArticlesComponent,
        title: 'edit-articles',
      },
    ],
  },

  {
    path: 'blog-page',
    component: BlogComponent,
    title: 'blog',
    children: [
      { path: 'article/:id', component: ArticleComponent, title: 'article' },
      { path: 'meetings', component: MeetingsComponent, title: 'meetings' },
    ],
  },
  {
    path: 'sobre-nosotros',
    component: AboutUsComponent,
    title: 'sobre nosotros',
  },
  { path: '**', component: NoFoundComponent, title: 'error 404' },
];
