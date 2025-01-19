import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('Prueba para servicio login', () => {
  let _loginService: LoginService;
  let _httMock: HttpTestingController;

  const URL_LOGIN = 'http://localhost:9000/login';
  const emailTest = 'dash12@gmail.com';
  const passwordTest = '456';
  const tokenTest = 'skrfbribvskjrw51';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    _loginService = TestBed.inject(LoginService);
    _httMock = TestBed.inject(HttpTestingController);

    // Asegura de que el localStorage esté vacío antes de cada prueba
    localStorage.clear();
  });

  afterEach(() => {
    _httMock.verify();
  });

  it('Debería hacer una petición POST - Iniciar sesión', () => {
    const mockRespuesta = {
      mensaje: 'Inicio de sesión exitoso',
      token: tokenTest,
    };

    const credencialesIngreso = { emailLogin: emailTest, passwordLogin: passwordTest };

    _loginService.inicioSesion(credencialesIngreso).subscribe((res) => {
      expect(res).toEqual(mockRespuesta);
    });

    const req = _httMock.expectOne(URL_LOGIN);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credencialesIngreso);
    req.flush(mockRespuesta);
  });

  it('Debería obtener el token almacenado en el localStorage', () => {
    // Simula un token almacenado
    localStorage.setItem('token', tokenTest); 

    expect(_loginService.obtenerToken()).toBe(tokenTest);
  });

  it('Debería verificar si el usuario está logueado', () => {
    // Simula un usuario logueado
    localStorage.setItem('token', tokenTest); 

    expect(_loginService.estaLogueado()).toBeTrue();
  });

  it('Debería cerrar sesión', () => {
    // Simula un usuario logueado
    localStorage.setItem('token', tokenTest); 

    _loginService.logout();
    // Verifica que el token ha sido eliminado
    expect(localStorage.getItem('token')).toBeNull(); 
  });
});
