import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef, useState } from "react";
import { agregarRoles } from "../../servicios/roles";

export default function CrearRol() {

    const [rol,setRol] =useState('')

    const save = async () => {
        const solicitud = await agregarRoles({rol})
        if(solicitud === 201)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Dato guardado' });
        else 
            toast.current.show({ severity: 'error', summary: 'error', detail: 'No se pudo insertar' });
    };

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
                <h2 className="title">AGREGAR ROLES</h2>
                <div className="card formulario">  

                    <FloatLabel className="input-field">
                        <InputText id="book-name" 
                            value={rol} onChange={(e) => setRol(e.target.value)}
                        />
                        <label htmlFor="book-name">Rol</label>
                    </FloatLabel>

                    <div className="button-container">
                        <Toast ref={toast}></Toast>
                        <Button label="Agregar" icon="pi pi-plus" onClick={save} model={items} severity="secondary" className="submit-button" />
                    </div>
                </div>
            </div>
            </>
    )
}