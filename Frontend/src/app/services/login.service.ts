import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Credenciales } from '../interfaces/credenciales';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly URL_LOGIN = 'http://localhost:9000/login';
  private readonly URL_REGISTER = 'http://localhost:9000/usuarios/crear';

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {}

  // Iniciar sesión
  inicioSesion(credencialesIngreso: Credenciales): Observable<any> {
    return this._httpClient.post(this.URL_LOGIN, credencialesIngreso);
  }

  // Obtener el token
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está logueado
  estaLogueado(): boolean {
    return !!this.obtenerToken();
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
