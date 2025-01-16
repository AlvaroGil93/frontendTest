import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../componentes/nav-bar/nav-bar.component';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterOutlet, RouterLink,NavBarComponent],
  templateUrl:'./blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
