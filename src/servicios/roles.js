/**
 * El código define dos funciones asincrónicas en JavaScript para buscar y agregar roles usando URL de
 * un archivo constante.
 * @returns La primera función, `TraerRoles`, devuelve la respuesta JSON de la llamada API realizada
 * para obtener una lista de roles.
 */
import { URL } from "../Constantes/Url"

export const TraerRoles = async () =>{
    const solicitud = await fetch(`${URL.ROLES.listar}`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const resultado = await solicitud.json()
    return resultado
}

export const agregarRoles = async (estados) =>{
    const solicitud = await fetch(`${URL.ROLES.crear}`,{
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estados)
    })
    const resultado = await solicitud.status    
    return resultado
}