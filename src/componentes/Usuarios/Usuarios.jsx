import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { emptyLibros } from '../../Constantes/Arreglos';
import { TraerUsuario, agregarusuarios, editarusuario, eliminarusuario } from '../../servicios/Usuarios';
import { TraerRoles } from '../../servicios/roles';

export const Usuarios = () =>{
    
    const [productDialog, setLibroDialog] = useState(false);
    const [deleteLibroDialog, setDeleteLibroDialog] = useState(false);
    const [deleteLibrosDialog, setDeleteLibrosDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [Enviado, setEnviado] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [Roles,setRoles] = useState()
    const [rol,setSelectedrol] = useState();

    const [usuario, setusuario] = useState(emptyLibros);
    const [Usuarios, setUsuarios] = useState([]);

    useEffect(() => {
       const Libros = async () =>{
            const newLibros = await TraerUsuario()
            setUsuarios(newLibros.data);
            const newcategorias = await TraerRoles()
            setRoles(newcategorias)
       }
       Libros()
    }, []);

    const AbrirModal = () => {
        setEnviado(false);
        setLibroDialog(true);
    };

    const ocultarModal = () => {
        setEnviado(false);
        setLibroDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteLibroDialog(false);
    };

    const ocultarEliminarLibrosModal = () => {
        setDeleteLibrosDialog(false);
    };

    const GuardarLibro = async () => {
        
        setEnviado(true)
        if (usuario.name.trim()) {
            let _usuarios = [...Usuarios];
            let _usuario = { ...usuario };
            _usuario.Rol = (_usuario.idRol.id == undefined) ? _usuario.Rol
                                        :_usuario.idRol.rol
            _usuario.idRol = (_usuario.idRol.id == undefined) ? _usuario.idRol
                                        :_usuario.idRol.id

            if (usuario.id) {                
                const index = findIndexById(usuario.id);                
                const solicitud =  await editarusuario(_usuario)
                
                if(solicitud === 200){
                    _usuarios[index] = _usuario; 
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'usuario actualizado', life: 3000 });
                }
            } else {
            
                const solicitud =  await agregarusuarios(_usuario)
                _usuario.id = createId()
                if(solicitud === 201){
                    _usuarios.push(_usuario);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'usuario creado', life: 3000 });
                }                
            }

            setUsuarios(_usuarios);
            setLibroDialog(false);
            setusuario(emptyLibros);
        }
    };

    const editProduct = (libro) => {
        setusuario({ ...libro });
        setLibroDialog(true);
    };

    const confirmDeleteProduct = (libro) => {
        setusuario(libro);
        setDeleteLibroDialog(true);
    };

    const deleteLibro = async () => {
        let _products = Usuarios.filter((val) => val.id !== usuario.id);
        const solicitud = await eliminarusuario(usuario.id)
        if(solicitud == 200){
            setUsuarios(_products);
            setDeleteLibroDialog(false);
            setusuario(emptyLibros);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'usuario eliminado', life: 3000 });
        }
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = Usuarios[Usuarios.length -1].id + 1   
        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteLibrosDialog(true);
    };

    const eliminarLibroSeleccionado = async () => {
        let _products = Usuarios.filter((val) => !selectedProducts.includes(val));
        let ids= "";

        for (let index = 0; index < selectedProducts.length; index++) {
            ids += selectedProducts[index].id + ','           
        }
        const solicitud = await eliminarusuario(ids)
        if(solicitud == 200){
            setUsuarios(_products);
            setDeleteLibrosDialog(false);
            setSelectedProducts(null);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'usuarios eliminados', life: 3000 });
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...usuario };

        _product[`${name}`] = val;

        setusuario(_product);
    };

    const BotonesIzquierdos = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={AbrirModal} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const AccionBotones = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Usuarios</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </IconField>
        </div>
    );

    const FooterLibros = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={ocultarModal} />
            <Button label="Guardar" icon="pi pi-check" onClick={GuardarLibro} />
        </React.Fragment>
    );

    const EliminarLibro = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={deleteLibro} />
        </React.Fragment>
    );

    const EliminarLibros = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={ocultarEliminarLibrosModal} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={eliminarLibroSeleccionado} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={BotonesIzquierdos}></Toolbar>

                <DataTable ref={dt} value={Usuarios} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={6} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>            
                    <Column field="id" header="Id" sortable style={{ width: '25%' }}></Column>
                    <Column field="name"  header="Nombre" sortable style={{ width: '25%' }}></Column>
                    <Column field="email" header="Correo" sortable style={{ width: '25%' }}></Column>
                    <Column field="Rol" header="Rol" sortable style={{ width: '25%' }}></Column>
                    <Column body={AccionBotones} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={FooterLibros} onHide={ocultarModal}>
                
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="name" value={usuario.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': Enviado && !usuario.name })} />
                    {Enviado && !usuario.name && <small className="p-error">el nombre es requerido.</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Correo
                    </label>
                    <InputText id="cantidad" value={usuario.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': Enviado && !usuario.email })} />
                    {Enviado && !usuario.email && <small className="p-error">el correo es requerida.</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Contraseña
                    </label>
                    <InputText id="cantidad" value={usuario.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': Enviado && !usuario.password })} />
                    {Enviado && !usuario.password && <small className="p-error">la contraseña es requerida.</small>}
                </div>

                <div className="field">
                    <label htmlFor="categoria" className="font-bold">
                        Rol
                    </label>
                    <Dropdown value={rol} onChange={(e) => {onInputChange(e, 'idRol'); setSelectedrol(e.value)}} options={Roles} optionLabel="rol" placeholder="selecciona una categoria" 
                    filter className="w-full md:w-14rem" />
                </div>
            </Dialog>

            <Dialog visible={deleteLibroDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarLibro} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {usuario && (
                        <span>
                            seguro deseas elimiar el usuario <b>{usuario.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteLibrosDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarLibros} onHide={ocultarEliminarLibrosModal}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {usuario && <span>seguro deseas eliminar todos los usuarios?</span>}
                </div>
            </Dialog>   
        </div>
    );
}
