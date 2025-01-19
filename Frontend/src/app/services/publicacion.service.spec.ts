import { TestBed } from '@angular/core/testing';
import { PublicacionService } from './publicacion.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('Prueba para Publicaciones Service', () => {
  let service: PublicacionService;
  let mockHttp: HttpTestingController;
  const urlGet = "http://localhost:9000/publicaciones/obtener";
  const urlPost = "http://localhost:9000/publicaciones/crear";
  const urlDelete = "http://localhost:9000/publicaciones/eliminar";

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

  // caso de prueba GET
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
// Caso de prueba Post
  it('Debería hacer una petición POST para crear una publicación', () => {
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

  //caso de prueba PUT
  it('Debería hacer una peticion PUT  a una publicación', () => {
    const mockPub = {
      _id: "12345",
      title: "Hola mundo",
      content: "Este es un test",
      image_url: "http://image.jpg",
      description: "mundo",
      createdAt: new Date(),
    };
  
    const udpdatePut = {
      _id: "12345",
      title: "Actualización",
      content: "Contenido actualizado",
      image_url: "http://image_updated.jpg",
      description: "Descripción actualizada",
      createdAt: new Date(),
    };
  
    const mockResponse = {
      mensaje: "Publicación actualizada",
      datos: udpdatePut,
    };
  
    // Llamada al servicio
    service.putPublicacion(udpdatePut, mockPub._id).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
  
    // Verificar la solicitud PUT
    const peticion = mockHttp.expectOne(`http://localhost:9000/publicaciones/actualizar/${mockPub._id}`);
    expect(peticion.request.method).toBe('PUT');
    expect(peticion.request.body).toEqual(udpdatePut);
  
    // solicitud con datos simulados
    peticion.flush(mockResponse);
  });
  
  it('Debería hacer una petición DELETE para eliminar una publicación', () => {
    const mockId = "12345";
    const mockResponse = {
      mensaje: "Publicación eliminada con éxito",
    };
  
    // Llamada al servicio
    service.deletePublicacion(mockId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
  
    // Verificar la solicitud DELETE
    const peticion = mockHttp.expectOne(`${urlDelete}/${mockId}`); 
    expect(peticion.request.method).toBe('DELETE');
  
    // solicitud con datos simulados
    peticion.flush(mockResponse);
  });
  
  

});
