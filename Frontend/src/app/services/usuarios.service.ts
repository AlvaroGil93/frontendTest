import { Injectable , inject} from '@angular/core';
import { Usuarios } from '../interfaces/usuarios';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

//1.injectar dependencias
private _httpClient = inject(HttpClient);

//ruta de conexion con el backend
private apiUrl = 'http://localhost:9000/usuarios';

postUsuarios(user: Usuarios){
  return this._httpClient.post(this.apiUrl + '/crear',user);
}
//peticiones get

getUsuarios(){
  return this._httpClient.get(this.apiUrl + '/obtener');
  
}


}

