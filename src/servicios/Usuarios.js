/**
 * El código define funciones para buscar, agregar, editar, eliminar usuarios y autenticar usuarios
 * utilizando URL de un archivo constante.
 * @returns El fragmento de código proporcionado contiene varias funciones que realizan solicitudes
 * asincrónicas a un servidor mediante la API Fetch. Cada función devuelve una Promesa que se resuelve
 * con un resultado específico según la solicitud realizada:
 */
import { URL } from "../Constantes/Url"

export const TraerUsuario = async () =>{
    const solicitud = await fetch(`${URL.USUARIOS.listar}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const resultado = await solicitud.json()
    return resultado
}

export const agregarusuarios = async (usuario) =>{
  const solicitud = await fetch(`${URL.USUARIOS.crear}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const editarusuario = async (usuario) =>{

  const solicitud = await fetch(`${URL.USUARIOS.editar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const eliminarusuario = async (id) =>{
  const solicitud = await fetch(`${URL.USUARIOS.eliminar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const AutenticarUser = async (user) =>{
  const solicitud = await fetch(`${URL.USUARIOS.autenticar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })
  const resultado = await solicitud.json()
  return resultado
}
