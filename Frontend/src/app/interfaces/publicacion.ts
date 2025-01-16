export interface Post {
  
    //Id del articulo
    _id: string;

    // Título del post
    title: string; // requerido
    //campo Image: string, required
    image_url: string;
    //campo description: string, required
    description: string;
    // Contenido del post
    content: string; // requerido
    
    // Nombre del autor del post
    author?: string; // opcional
  
    // Categoría del post (noticias, mantenimientos de moto, rutas para rodar, modelos de motos)
    category?: string; // opcional
  
    // Fecha de creación del post
    createdAt: Date; // requerido, con valor por defecto
  
    // Fecha de última actualización del post
    updatedAt?: Date; // opcional
  
  }
  