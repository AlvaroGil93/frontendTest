import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
// Debemos importar el inject para poder injectar (usar) el servicio
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  //Definimos la logica
  //Mostramos el dashboard (vista de admin) solo si el usuario esta logueado

  //1. Inyectar depenedencias
  const _loginService = inject(LoginService);
  const _router = inject(Router);

  //Validar si ya inició sesión o no
  //Si no esta logueado, 
    //Redirecionamos a el login
    //return false

  if (!_loginService.estaLogueado()) {
    _router.navigate(["/login"])
    return false
  }

  // Validar si es admin
  // Si no es admin
    // Redireccionar al inicio
    // return false
  if (!_loginService.esAdmin()) {
    _router.navigate(["/"])
    return false
  }

  return true;
};
