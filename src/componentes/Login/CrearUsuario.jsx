import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { agregarusuarios } from '../../servicios/Usuarios';
import { TraerRoles } from '../../servicios/roles';

export function CrearUSuario({setCrearUsuario,setLogin}){

    const [selectedRol, setSelectedRol] = useState(null);
    const [Roles, setRoles] = useState(null);

    const [nombre,setnombre] =useState('')
    const [email,setemail] =useState('')
    const [password,setpassword] =useState('')

    const save = async () => {
        const newUser = {
            name: nombre,
            email,
            password,
            idRol : selectedRol.id
        }
        const solicitud = await agregarusuarios(newUser)
        if(solicitud === 201){
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Dato guardado' });
            setLogin(true)
            setCrearUsuario(false)
        }            
        else 
            toast.current.show({ severity: 'error', summary: 'error', detail: 'No se pudo insertar' });
    };

    useEffect(() =>{
        const Roles = async () =>{
            const solicitud = await TraerRoles()
            setRoles(solicitud)
        }

        Roles()
    },[])

    const toast = useRef(null);
    
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
            }
        }
    ];

    return (
        <>
            <div className="container">
                <h2 className="title">CREAR USUARIO</h2>
                <div className="card formulario">  

                    <FloatLabel className="input-field">
                        <InputText id="book-name" 
                            value={nombre} onChange={(e) => setnombre(e.target.value)}
                        />
                        <label htmlFor="book-name">Nombre</label>
                    </FloatLabel>

                    <FloatLabel className="input-field">
                        <InputText id="book-name" 
                            value={email} onChange={(e) => setemail(e.target.value)}
                        />
                        <label htmlFor="book-name">Correo</label>
                    </FloatLabel>

                    <FloatLabel className="input-field">
                        <InputText id="book-name" 
                            value={password} onChange={(e) => setpassword(e.target.value)}
                        />
                        <label htmlFor="book-name">Contraseña</label>
                    </FloatLabel>

                    <Dropdown value={selectedRol} onChange={(e) => setSelectedRol(e.value)} options={Roles} optionLabel="rol" 
                        placeholder="Seleccione un rol" className="w-full md:w-14rem" />

                    <div className="button-container">
                        <Toast ref={toast}></Toast>
                        <Button label="Crear Usuario" icon="pi pi-plus" onClick={save} model={items} severity="secondary" className="submit-button" />
                        <Button label="Iniciar sesion" icon="pi pi-plus" onClick={() =>{setLogin(true);setCrearUsuario(false)}} model={items} severity="secondary" className="info-button" />
                    </div>
                </div>
            </div>
            </>
    )
}

CrearUSuario.propTypes = {
    setCrearUsuario: PropTypes.func.isRequired,
    setLogin :  PropTypes.func.isRequired,
}
 