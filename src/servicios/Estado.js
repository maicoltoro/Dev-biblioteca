/**
 * El código define dos funciones asincrónicas en JavaScript para buscar y agregar estados utilizando
 * puntos finales de API REST.
 * @returns La función `TraerEstados` devuelve la respuesta JSON de la llamada API para listar estados.
 * La función `agregarEstados` está devolviendo el estado de la llamada API para crear un nuevo estado.
 */
import { URL } from "../Constantes/Url"

export const TraerEstados = async () =>{
    const solicitud = await fetch(`${URL.ESTADOS.listar}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const resultado = await solicitud.json()
    return resultado
}

export const agregarEstados = async (estados) =>{
    const solicitud = await fetch(`${URL.ESTADOS.crear}`,{
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estados)
    })
    const resultado = await solicitud.status
    
    return resultado
}