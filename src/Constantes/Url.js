export const URL = {
    LIBRO : {
        listar : 'http://127.0.0.1:8000/api/listarLibros',
        crear:'http://127.0.0.1:8000/api/CrearLibros',
        editar :'http://127.0.0.1:8000/api/editarLibros',
        eliminar :'http://127.0.0.1:8000/api/eliminarLibros',
    },
    CATEGORIA :{
        listar : 'http://127.0.0.1:8000/api/ListarCategorias',
        crear:'http://127.0.0.1:8000/api/CrearCategorias',
        editar :'http://127.0.0.1:8000/api/editarCategorias',
        eliminar :'http://127.0.0.1:8000/api/eliminarCategorias',
    },
    PRESTAMOS :{
        listar : 'http://127.0.0.1:8000/api/ListarPrestamos',
        crear:'http://127.0.0.1:8000/api/CrearPrestamos',
        editar :'http://127.0.0.1:8000/api/editarPrestamos',
        eliminar :'http://127.0.0.1:8000/api/eliminarPrestamos',
    },
    USUARIOS :{
        listar : 'http://127.0.0.1:8000/api/ListarUsuarios',
        crear:'http://127.0.0.1:8000/api/register',
        editar :'http://127.0.0.1:8000/api/editarUsuarios',
        eliminar :'http://127.0.0.1:8000/api/eliminarUsuarios',
        autenticar :'http://127.0.0.1:8000/api/login',
    },
    ESTADOS :{
        listar : 'http://127.0.0.1:8000/api/ListarEstado',
        crear:'http://127.0.0.1:8000/api/CrearEstado',
    },
    ROLES :{
        listar : 'http://127.0.0.1:8000/api/ListarRol',
        crear:'http://127.0.0.1:8000/api/CrearRol',
    },
    GRAFICAS :{
        usuario : 'http://127.0.0.1:8000/api/GraficaUsuario',
        libro:'http://127.0.0.1:8000/api/GraficaLibros',
    }
}
