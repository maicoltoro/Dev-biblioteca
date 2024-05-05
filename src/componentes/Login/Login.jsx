import { CrearUSuario } from './CrearUsuario'
import { IniciarSesion } from './IniciarSesion'
import PropTypes from 'prop-types';
import './login.css'

import { useState } from 'react'
export function Login ({SetSesion, SetDatosUsuario}){

    const [CrearUsuario, setCrearUsuario] = useState(false)
    const [login, setLogin] = useState(true)
    return(
        <>
            {login && <IniciarSesion  SetDatosUsuario={SetDatosUsuario}setCrearUsuario={setCrearUsuario} setLogin={setLogin} SetSesion={SetSesion} />}
            {CrearUsuario && <CrearUSuario setCrearUsuario={setCrearUsuario} setLogin={setLogin}/> }
        </>
    )
}

Login.propTypes = {
    SetSesion: PropTypes.func.isRequired,
    SetDatosUsuario:PropTypes.func.isRequired,
}