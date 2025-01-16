import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { NavBarComponent } from '../../componentes/nav-bar/nav-bar.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink,FooterComponent,NavBarComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
