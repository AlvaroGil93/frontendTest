import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { NgFor } from '@angular/common';
import { Usuarios } from '../../../interfaces/usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

    _userService = inject(UsuariosService)

    allUsers: Usuarios[] = [];

    getUsers(){
      this._userService.getUsuarios().subscribe({
        next: (res: any) => {
          this.allUsers = res.datos
          console.log("Got Users", this.allUsers);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }

    ngOnInit(){
      this.getUsers()
    }

}
