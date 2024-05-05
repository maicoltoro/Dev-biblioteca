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
import { TraerLibros, agregarLibro, editarLibro, eliminarLibro } from '../../servicios/Libros';
import { Dropdown } from 'primereact/dropdown';
import { emptyLibros } from '../../Constantes/Arreglos';
import { traerCategorias } from '../../servicios/Categorias';

export const Libros = () =>{
    const [selectedcategorias,setSelectedcategorias] = useState();
    const [productDialog, setLibroDialog] = useState(false);
    const [deleteLibroDialog, setDeleteLibroDialog] = useState(false);
    const [deleteLibrosDialog, setDeleteLibrosDialog] = useState(false);
    const [libro, setlibro] = useState(emptyLibros);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [Enviado, setEnviado] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [categorias,setCategorias] = useState()
    const toast = useRef(null);
    const dt = useRef(null);

    const [libros, setLibros] = useState([]);

    useEffect(() => {
       const Libros = async () =>{
            const newLibros = await TraerLibros()
            setLibros(newLibros)
            const newcategorias = await traerCategorias()
            setCategorias(newcategorias)
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
        if (libro.nombre.trim()) {
            let _libros = [...libros];
            let _libro = { ...libro };

            const newLibroDB = {
                idcategoria:_libro.nombre_categoria.id,
                nombre : _libro.nombre,
                cantidad : _libro.cantidad
            }

            if (libro.id) {                
                const index = findIndexById(libro.id);
                _libro.nombre_categoria = (_libro.nombre_categoria.categoria == undefined) ? _libro.nombre_categoria
                                        :_libro.nombre_categoria.categoria
                
                newLibroDB['id'] = _libro.id
                const solicitud =  await editarLibro(newLibroDB)
                
                if(solicitud === 200){
                    _libros[index] = _libro; 
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'libro actualizado', life: 3000 });
                }
            } else {
                const newLibro = {
                    id : createId(),
                    nombre : _libro.nombre,
                    cantidad: _libro.cantidad,
                    nombre_categoria: _libro.nombre_categoria.categoria
                }
               
                const solicitud =  await agregarLibro(newLibroDB)
                if(solicitud === 201){
                    _libros.push(newLibro);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'libro creado', life: 3000 });
                }                
            }

            setLibros(_libros);
            setLibroDialog(false);
            setlibro(emptyLibros);
        }
    };

    const editProduct = (libro) => {
        setlibro({ ...libro });
        setLibroDialog(true);
    };

    const confirmDeleteProduct = (libro) => {
        setlibro(libro);
        setDeleteLibroDialog(true);
    };

    const deleteLibro = async () => {
        let _products = libros.filter((val) => val.id !== libro.id);
        const solicitud = await eliminarLibro(libro.id)
        if(solicitud == 200){
            setLibros(_products);
            setDeleteLibroDialog(false);
            setlibro(emptyLibros);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Libro eliminado', life: 3000 });
        }
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < libros.length; i++) {
            if (libros[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = libros[libros.length -1] .id + 1   
        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteLibrosDialog(true);
    };

    const eliminarLibroSeleccionado = async () => {
        let _products = libros.filter((val) => !selectedProducts.includes(val));
        let ids= "";

        for (let index = 0; index < selectedProducts.length; index++) {
            ids += selectedProducts[index].id + ','           
        }
        const solicitud = await eliminarLibro(ids)
        if(solicitud == 200){
            setLibros(_products);
            setDeleteLibrosDialog(false);
            setSelectedProducts(null);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Libros eliminados', life: 3000 });
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...libro };

        _product[`${name}`] = val;

        setlibro(_product);
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
            <h4 className="m-0">Libros</h4>
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

                <DataTable ref={dt} value={libros} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={6} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>            
                    <Column field="id" header="Id" sortable style={{ width: '25%' }}></Column>
                    <Column field="nombre"  header="Nombre" sortable style={{ width: '25%' }}></Column>
                    <Column field="nombre_categoria" header="Categoria" sortable style={{ width: '25%' }}></Column>
                    <Column field="cantidad" header="Cantidad" sortable style={{ width: '25%' }}></Column>
                    <Column body={AccionBotones} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={FooterLibros} onHide={ocultarModal}>
                
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="name" value={libro.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': Enviado && !libro.nombre })} />
                    {Enviado && !libro.nombre && <small className="p-error">el nombre es requerido.</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Cantidad
                    </label>
                    <InputText id="cantidad" value={libro.cantidad} onChange={(e) => onInputChange(e, 'cantidad')} required autoFocus className={classNames({ 'p-invalid': Enviado && !libro.cantidad })} />
                    {Enviado && !libro.cantidad && <small className="p-error">la cantidad es requerida.</small>}
                </div>

                <div className="field">
                    <label htmlFor="categoria" className="font-bold">
                        Categoria
                    </label>
                    <Dropdown value={selectedcategorias} onChange={(e) => {onInputChange(e, 'nombre_categoria'); setSelectedcategorias(e.value)}} options={categorias} optionLabel="categoria" placeholder="selecciona una categoria" 
                    filter className="w-full md:w-14rem" />
                </div>
            </Dialog>

            <Dialog visible={deleteLibroDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarLibro} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {libro && (
                        <span>
                            seguro deseas elimiar el libro <b>{libro.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteLibrosDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarLibros} onHide={ocultarEliminarLibrosModal}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {libro && <span>seguro deseas eliminar todos los libros?</span>}
                </div>
            </Dialog>   
        </div>
    );
}
