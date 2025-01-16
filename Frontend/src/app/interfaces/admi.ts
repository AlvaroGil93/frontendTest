export interface Admin {
    // Nombre de usuario único y requerido para identificar al administrador
    username: string; // requerido y único
  
    // Correo electrónico para el inicio de sesión
    email: string; // requerido y único
  
    // Contraseña del administrador
    password: string; // requerido
  
    // Rol del administrador que define el nivel de acceso
    role: 'superadmin'; // solo acepta 'superadmin'
  
    // Permisos específicos del administrador
    permissions: {
      content: string; // Permiso para crear publicaciones
      editPost: boolean; // Permiso para editar publicaciones
      deletePost: boolean; // Permiso para eliminar publicaciones
      manageCategories: boolean; // Permiso para gestionar categorías
      manageUsers: boolean; // Permiso para gestionar otros usuarios
    };
  
    // Fecha de creación del administrador
    createdAt: Date; // requerido, con valor por defecto
  
    // Fecha de última actualización del perfil del administrador
    updatedAt?: Date; // opcional
  }
  