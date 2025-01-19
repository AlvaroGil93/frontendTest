import { TestBed } from '@angular/core/testing';
import { UsuariosService } from './usuarios.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Prueba para UsuariosService', () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController;
  const urlTest = 'http://localhost:9000/usuarios/obtener';
  const apiUrl = 'http://localhost:9000/usuarios/crear'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuariosService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('Debería hacer petición GET para mostrar usuarios exitosamente', () => {
    const mockUsers = [
      { username: 'pepito G', email: 'pepitog@gmail.com', password: '123' },
      { username: 'dash', email: 'dashg@gmail.com', password: '123' },
    ];

    const mockResponse = {
      mensaje: 'Se encontraron usuarios almacenados',
      data: mockUsers,
      numeroUsers: mockUsers.length,
    };

    service.getUsuarios().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const peticion = httpMock.expectOne(urlTest);
    expect(peticion.request.method).toBe('GET');
    peticion.flush(mockResponse); // Devuelve la respuesta simulada
  });

  it('Debería hacer petición POST para crear un usuario exitosamente', () => {
    const nuevoUsuario = {
      username: 'Juan Pérez',
      email: 'juanp@gmail.com',
      password: '123456',
    };

    const mockResponse = {
      mensaje: 'Usuario creado exitosamente',
      data: nuevoUsuario,
    };
    service.postUsuarios(nuevoUsuario).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const peticion = httpMock.expectOne(apiUrl);
    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body).toEqual(nuevoUsuario); // Verifica que el cuerpo de la solicitud es el correcto
    peticion.flush(mockResponse); // Devuelve la respuesta simulada
  });
});
