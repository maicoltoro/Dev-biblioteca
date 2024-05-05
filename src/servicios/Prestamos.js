/**
 * Estas funciones manejan operaciones CRUD para administrar datos de préstamos mediante solicitudes de
 * recuperación en JavaScript.
 * @returns Las funciones `Traerprestamos`, `agregarPRESTAMOS`, `editarprestamos` y `eliminarprestamos`
 * devuelven los códigos de estado HTTP de las solicitudes de recuperación realizadas a las URL
 * especificadas.
 */
import { URL } from "../Constantes/Url"

export const Traerprestamos = async () =>{
    const solicitud = await fetch(`${URL.PRESTAMOS.listar}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const resultado = await solicitud.json()
    return resultado
}

export const agregarPRESTAMOS = async (prestamos) =>{
  const solicitud = await fetch(`${URL.PRESTAMOS.crear}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prestamos)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const editarprestamos = async (prestamos) =>{

  const solicitud = await fetch(`${URL.PRESTAMOS.editar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prestamos)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const eliminarprestamos = async (id) =>{
console.log(id)
  const solicitud = await fetch(`${URL.PRESTAMOS.eliminar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
  })
  const resultado = await solicitud.status
  
  return resultado
}