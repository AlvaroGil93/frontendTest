//Nos permite enviar el token de autenticación

import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login.service';
//Necesitamos el inject para poder implementar el servicio
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //1. inject the service
  const _loginService = inject(LoginService);
  //2. declarar las variables que necesitamos
  const token = _loginService.obtenerToken();

  //Enviamos el token a las peticiones
  const tokenReq = token
    ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    : req;

  return next(tokenReq);
};
