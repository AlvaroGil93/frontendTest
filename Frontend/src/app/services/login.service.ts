import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Credenciales } from '../interfaces/credenciales';
import { jwtDecode } from 'jwt-decode';  // Importación correcta

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL_LOGIN = 'http://localhost:9000/login';
  private readonly URL_REGISTER = 'http://localhost:9000/usuarios/crear';  // URL de registro

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  // Iniciar sesión
  inicioSesion(credencialesIngreso: Credenciales): Observable<any> {
    return this._httpClient.post(this.URL_LOGIN, credencialesIngreso);
  }

  // Registrar usuario
  registroUsuario(usuario: { username: string; email: string; password: string }): Observable<any> {
    return this._httpClient.post(this.URL_REGISTER, usuario);
  }

  // Obtener el token
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Validar si es admin
  esAdmin(): boolean {
    const token = this.obtenerToken();
    if (!token) {
      console.error('No se encontró token');
      return false;
    }

    const decodificado: any = jwtDecode(token);  // Uso correcto de jwtDecode
    return decodificado.role === "superadmin";
  }

  // Redirigir dependiendo del rol
  redireccionar(): void {
    if (this.esAdmin()) {
      this._router.navigate(['/admin']);
    } else {
      this._router.navigate(['/']);
    }
  }

  // Verificar si está logueado
  estaLogueado(): boolean {
    return !!this.obtenerToken();
  }

  // Cerrar sesión
  cierreSesion(): void {
    this._toastrService.info('Cierre de sesión exitoso, hasta la próxima!');
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
