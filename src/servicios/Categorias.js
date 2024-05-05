/**
 * El código contiene funciones para buscar, agregar, editar y eliminar categorías utilizando URL de un
 * archivo constante.
 * @returns Las funciones `traerCategorias`, `agregarCategorias`, `editarCategorias` y
 * `eliminarCategorias` devuelven los códigos de estado HTTP de las solicitudes de recuperación
 * realizadas a las URL especificadas.
 */
import { URL } from "../Constantes/Url"

export const traerCategorias = async () =>{
    const solicitud = await fetch(`${URL.CATEGORIA.listar}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const resultado = await solicitud.json()
    return resultado
}

export const agregarCategorias = async (categoria) =>{
  const solicitud = await fetch(`${URL.CATEGORIA.crear}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoria)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const editarCategorias = async (categoria) =>{

  const solicitud = await fetch(`${URL.CATEGORIA.editar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoria)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const eliminarCategorias = async (id) =>{
console.log(id)
  const solicitud = await fetch(`${URL.CATEGORIA.eliminar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
  })
  const resultado = await solicitud.status
  
  return resultado
}