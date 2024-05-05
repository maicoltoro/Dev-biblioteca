/**
 * El código anterior define dos funciones asincrónicas en JavaScript para recuperar datos de usuarios
 * y libros de URL especificadas.
 * @returns Las funciones `G_usuario` y `G_Libro` están devolviendo la respuesta JSON de las
 * solicitudes API realizadas mediante `fetch`.
 */
import { URL } from "../Constantes/Url"

export const G_usuario = async () =>{
    const solicitud = await fetch(`${URL.GRAFICAS.usuario}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const resultado = await solicitud.json()
    return resultado
}

export const G_Libro = async (estados) =>{
    const solicitud = await fetch(`${URL.GRAFICAS.libro}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estados)
    })
    const resultado = await solicitud.json()    
    return resultado
}