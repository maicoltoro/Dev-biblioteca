/**
 * El código define funciones para buscar, agregar, editar y eliminar libros usando async/await y fetch
 * en JavaScript.
 * @returns Las funciones `TraerLibros`, `agregarLibro`, `editarLibro` y `eliminarLibro` devuelven el
 * código de estado HTTP de la solicitud realizada al servidor. El código de estado indica el éxito o
 * el fracaso de la solicitud.
 */
import { URL } from "../Constantes/Url"

export const TraerLibros = async () =>{
    const solicitud = await fetch(`${URL.LIBRO.listar}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const resultado = await solicitud.json()
    return resultado
}

export const agregarLibro = async (libro) =>{
  const solicitud = await fetch(`${URL.LIBRO.crear}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(libro)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const editarLibro = async (libro) =>{

  const solicitud = await fetch(`${URL.LIBRO.editar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(libro)
  })
  const resultado = await solicitud.status
  
  return resultado
}

export const eliminarLibro = async (id) =>{
console.log(id)
  const solicitud = await fetch(`${URL.LIBRO.eliminar}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
  })
  const resultado = await solicitud.status
  
  return resultado
}