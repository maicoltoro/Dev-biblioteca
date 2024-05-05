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
import { emptyLibros } from '../../Constantes/Arreglos';
import { agregarCategorias, editarCategorias, eliminarCategorias, traerCategorias } from '../../servicios/Categorias';

export const Categorias = () =>{
    const [productDialog, setCategoriaDialog] = useState(false);
    const [deleteLibroDialog, setDeleteLibroDialog] = useState(false);
    const [deleteLibrosDialog, setDeleteLibrosDialog] = useState(false);
    const [Cate, setCate] = useState(emptyLibros);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [Enviado, setEnviado] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [categoria, setCategoria] = useState([]);
    useEffect(() => {
       const categoria = async () =>{
            const newcategoria = await traerCategorias()
            setCategoria(newcategoria)
       }
       categoria()
    }, []);

    const AbrirModal = () => {
        setEnviado(false);
        setCategoriaDialog(true);
    };

    const ocultarModal = () => {
        setEnviado(false);
        setCategoriaDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteLibroDialog(false);
    };

    const ocultarEliminarCategoriasModal = () => {
        setDeleteLibrosDialog(false);
    };

    const GuardarLibro = async () => {
        setEnviado(true)
        if (Cate.categoria.trim()) {
            let _categorias = [...categoria];
            let _categoria = { ...Cate };


            if (Cate.id) {                
                const index = findIndexById(Cate.id);                
                const solicitud =  await editarCategorias(_categoria)
                
                if(solicitud === 200){
                    _categorias[index] = _categoria; 
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'libro actualizado', life: 3000 });
               }
            } else {
               
                const solicitud =  await agregarCategorias(_categoria)
                if(solicitud === 201){
                    _categoria.id = createId(),
                    _categorias.push(_categoria);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'libro creado', life: 3000 });
                }                
            }

            setCategoria(_categorias);
            setCategoriaDialog(false);
            setCate(emptyLibros);
        }
    };

    const editProduct = (libro) => {
        setCate({ ...libro });
        setCategoriaDialog(true);
    };

    const confirmDeleteProduct = (libro) => {
        setCate(libro);
        setDeleteLibroDialog(true);
    };

    const deleteLibro = async () => {
        let _products = categoria.filter((val) => val.id !== Cate.id);
        const solicitud = await eliminarCategorias(Cate.id)
        if(solicitud == 200){
            setCategoria(_products);
            setDeleteLibroDialog(false);
            setCate(emptyLibros);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Libro eliminado', life: 3000 });
        }
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < categoria.length; i++) {
            if (categoria[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = categoria[categoria.length -1] .id + 1   
        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteLibrosDialog(true);
    };

    const eliminarCategoriasSeleccionado = async () => {
        let _products = categoria.filter((val) => !selectedProducts.includes(val));
        let ids= "";

        for (let index = 0; index < selectedProducts.length; index++) {
            ids += selectedProducts[index].id + ','           
        }
        const solicitud = await eliminarCategorias(ids)
        if(solicitud == 200){
            setCategoria(_products);
            setDeleteLibrosDialog(false);
            setSelectedProducts(null);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoria eliminada', life: 3000 });
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...Cate };
        _product[`${name}`] = val;
        setCate(_product);
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
            <h4 className="m-0">Categorias</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </IconField>
        </div>
    );

    const Footercategorias = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={ocultarModal} />
            <Button label="Guardar" icon="pi pi-check" onClick={GuardarLibro} />
        </React.Fragment>
    );

    const EliminarCategorias = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={deleteLibro} />
        </React.Fragment>
    );

    const EliminarCategoria = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={ocultarEliminarCategoriasModal} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={eliminarCategoriasSeleccionado} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={BotonesIzquierdos}></Toolbar>

                <DataTable ref={dt} value={categoria} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={6} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>            
                    <Column field="id" header="Id" sortable style={{ width: '25%' }}></Column>
                    <Column field="categoria"  header="Categoria" sortable style={{ width: '25%' }}></Column>
                    <Column body={AccionBotones} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={Footercategorias} onHide={ocultarModal}>
                
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="name" value={Cate.categoria} onChange={(e) => onInputChange(e, 'categoria')} required autoFocus className={classNames({ 'p-invalid': Enviado && !Cate.categoria })} />
                    {Enviado && !Cate.categoria && <small className="p-error">el nombre es requerido.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteLibroDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarCategorias} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Cate && (
                        <span>
                            seguro deseas elimiar la categoria <b>{Cate.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteLibrosDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={EliminarCategoria} onHide={ocultarEliminarCategoriasModal}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Cate && <span>seguro deseas eliminar todas las categorias?</span>}
                </div>
            </Dialog>   
        </div>
    );
}
