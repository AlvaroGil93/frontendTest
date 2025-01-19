import { TestBed } from '@angular/core/testing';
import { PublicacionService } from './publicacion.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('Prueba para Publicaciones Service', () => {
  let service: PublicacionService;
  let mockHttp: HttpTestingController;
  const urlGet = "http://localhost:9000/publicaciones/obtener";
  const urlPost = "http://localhost:9000/publicaciones/crear";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicacionService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PublicacionService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    mockHttp.verify();
  });

  it('Debería hacer una petición GET para mostrar publicaciones', () => {
    const mockPub = [
      { title: "Karma", content: "Este es un test" },
      { title: "Karma", content: "Este es un test" },
    ];

    const mockResponse = {
      mensaje: "Se encontraron publicaciones",
      datos: mockPub,
    };

    service.getPublicacion().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const peticion = mockHttp.expectOne(urlGet);
    expect(peticion.request.method).toBe('GET');
    peticion.flush(mockResponse);
  });

  it('Debería hacer una petición POST para crear una publicación', () => {
    // Asegurándonos de que el mockPub tenga todas las propiedades requeridas
    const mockPub = {
      _id: "12345",              
      title: "Hola mundo",       
      content: "Este es un test", 
      image_url: "http:/image.jpg", 
      description: " mundo", 
      createdAt: new Date() 
    };
  
    const mockResponse = {
      mensaje: "Se creó publicación",
      datos: mockPub,
    };
  
    service.postPublicacion(mockPub).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
  
    const peticion = mockHttp.expectOne(urlPost);
    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body).toEqual(mockPub); 
    peticion.flush(mockResponse);
  });
});
