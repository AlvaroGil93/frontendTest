import { Component } from '@angular/core';
import { NavBarComponent } from '../../componentes/nav-bar/nav-bar.component';
import { FooterComponent } from "../../componentes/footer/footer.component";
@Component({
  selector: 'app-no-found',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './no-found.component.html',
  styleUrl: './no-found.component.css'
})
export class NoFoundComponent {

}
