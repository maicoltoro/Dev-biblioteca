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
import { Traerprestamos, agregarPRESTAMOS, editarprestamos, eliminarprestamos } from '../../servicios/Prestamos';
import { emptyLibros } from '../../Constantes/Arreglos';
import { TraerUsuario } from '../../servicios/Usuarios';
import { TraerLibros } from '../../servicios/Libros';
import { TraerEstados } from '../../servicios/Estado';
import { Tag } from 'primereact/tag';

export function Prestamos(){

    const [productDialog, setLibroDialog] = useState(false);
    const [deleteLibroDialog, setDeleteLibroDialog] = useState(false);
    const [deleteLibrosDialog, setDeleteLibrosDialog] = useState(false);
    const [prestamo, setPrestamo] = useState(emptyLibros);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [Enviado, setEnviado] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const [usuario, setSelectedusuario] = useState(null);
    const [Usuarios,setUsuarios] = useState([])

    const [libro, setSelectedLibro] = useState(null);
    const [libros,setlibros] = useState([])

    const [estado, setSelectedEstado] = useState(null);
    const [Estados,setEstados] = useState([])

    const toast = useRef(null);
    const dt = useRef(null);
    const [Prestamos, setPrestamos] = useState([]);


    useEffect(() => {
       const Prestamos = async () =>{
            const newPrestamo = await Traerprestamos()
            const newUsuario = await TraerUsuario()
            const newLibros = await TraerLibros()
            const newEstado = await TraerEstados()
            setEstados(newEstado)
            setlibros(newLibros)
            setUsuarios(newUsuario.data)
            setPrestamos(newPrestamo)
       }
       Prestamos()
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
        prestamo['idEstado'] = prestamo.estado.id
        prestamo['idusuario'] = prestamo.Usuario.id
        prestamo['idlibro'] = prestamo.Nombre_Libro.id
        prestamo.Nombre_Libro = prestamo.Nombre_Libro.nombre
        prestamo.Usuario = prestamo.Usuario.name
        prestamo.estado = prestamo.estado.estado
        
        if (prestamo.Usuario.trim()) {
            let _prestamos = [...Prestamos];
            let _prestamo = { ...prestamo };

            const solicitud =  await agregarPRESTAMOS(_prestamo)
            _prestamo.id = createId()
            if(solicitud === 201){
                _prestamos.push(_prestamo);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'prestamo creado', life: 3000 });
            }    

            setPrestamos(_prestamos);
            setLibroDialog(false);
            setPrestamo(emptyLibros);
        }
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={Estados}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option.estado}></Tag>; 
                }}
            />
        );
    };

    const confirmDeleteProduct = (libro) => {
        setPrestamo(libro);
        setDeleteLibroDialog(true);
    };

    const deleteLibro = async () => {
        let _products = Prestamos.filter((val) => val.id !== prestamo.id);
        const solicitud = await eliminarprestamos(prestamo.id)
        if(solicitud == 200){
            setPrestamos(_products);
            setDeleteLibroDialog(false);
            setPrestamo(emptyLibros);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Prestamo eliminado', life: 3000 });
        }
    };

    const createId = () => {
        let id = Prestamos[Prestamos.length -1] .id + 1   
        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteLibrosDialog(true);
    };

    const eliminarLibroSeleccionado = async () => {
        let _products = Prestamos.filter((val) => !selectedProducts.includes(val));
        let ids= "";

        for (let index = 0; index < selectedProducts.length; index++) {
            ids += selectedProducts[index].id + ','           
        }
        const solicitud = await eliminarprestamos(ids)
        if(solicitud == 200){
            setPrestamos(_products);
            setDeleteLibrosDialog(false);
            setSelectedProducts(null);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Prestamos eliminados', life: 3000 });
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...prestamo };
        _product[`${name}`] = val;
        setPrestamo(_product);
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
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const onRowEditComplete = async (e) => {
        
        let _products = [...Prestamos];
        let { newData, index } = e;
        newData.idEstado = newData.Estado.id
        newData.Estado = newData.Estado.estado
        
        const solicitud =  await editarprestamos(newData)                
        if(solicitud === 200){
            _products[index] = newData;
            setPrestamos(_products);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'prestamo actualizado', life: 3000 });            
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Libros prestados</h4>
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



    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={BotonesIzquierdos}></Toolbar>

                <DataTable ref={dt} editMode="row" onRowEditComplete={onRowEditComplete} value={Prestamos} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={6} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>            
                    <Column field="id" header="Id" sortable style={{ width: '25%' }}></Column>
                    <Column field="Usuario"  header="Usuario" sortable style={{ width: '25%' }}></Column>
                    <Column field="Nombre_Libro" header="Libro" sortable style={{ width: '25%' }}></Column>
                    <Column field="Estado"  editor={(options) => statusEditor(options)} header="Estado" sortable style={{ width: '25%' }}></Column>
                    <Column field="tiempo_semanas" editor={(options) => textEditor(options)} header="Tiempo/semana" sortable style={{ width: '25%' }}></Column>
                    <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    <Column body={AccionBotones} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={FooterLibros} onHide={ocultarModal}>
                
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Usuario
                    </label>

                    <Dropdown  value={usuario} onChange={(e) =>{ onInputChange(e, 'Usuario') ; setSelectedusuario(e.value) }} options={Usuarios} optionLabel="name" placeholder="Seleccciona un usuario" 
                    filter  className="w-full md:w-14rem" />

                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Libro
                    </label>

                    <Dropdown  value={libro} onChange={(e) => {onInputChange(e, 'Nombre_Libro'); setSelectedLibro(e.value)}} options={libros} optionLabel="nombre" placeholder="Seleccciona un libro" 
                    filter  className="w-full md:w-14rem" />
                </div>

                <div className="field">
                    <label htmlFor="categoria" className="font-bold">
                        Estado
                    </label>
                    <Dropdown  value={estado} onChange={(e) => {setSelectedEstado(e.value);onInputChange(e, 'estado') }} options={Estados} optionLabel="estado" placeholder="Seleccciona un estado" 
                    filter  className="w-full md:w-14rem" />
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Tiempo/semana
                    </label>
                    <InputText id="cantidad" value={prestamo.tiempo_semanas} onChange={(e) => onInputChange(e, 'tiempo_semanas')} required autoFocus className={classNames({ 'p-invalid': Enviado && !prestamo.tiempo_semanas })} />
                    {Enviado && !prestamo.tiempo_semanas && <small className="p-error">El tiempo es requerida.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteLibroDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarLibro} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {prestamo && (
                        <span>
                            seguro deseas elimiar el prestamo <b>{prestamo.Usuario}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteLibrosDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarLibros} onHide={ocultarEliminarLibrosModal}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {prestamo && <span>seguro deseas eliminar todos los Prestamos?</span>}
                </div>
            </Dialog>   
        </div>
    );
}
