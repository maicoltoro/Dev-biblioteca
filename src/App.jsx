import './App.css'
import { Menubar } from 'primereact/menubar';
import { Routes, Route,useNavigate } from 'react-router-dom';
import { Libros } from './componentes/Libros/Libros';
import { Categorias } from './componentes/Categorias/Categorias';
import CrearEstado from './componentes/Prestamos/CrearEstado';
import { Prestamos } from './componentes/Prestamos/Prestamos';
import CrearRol from './componentes/Usuarios/CrearRol';
import { Usuarios } from './componentes/Usuarios/Usuarios';
import { Login } from './componentes/Login/Login';
import { useState } from 'react';
import { Graficas } from './componentes/Graficas/Graficas';

function App() {

  const [sesion, SetSesion] = useState(false)
  const [DatosUsuario, SetDatosUsuario] = useState({})
  const navigate = useNavigate();
  const items = [
        {
            label: 'Libros',
            icon: 'pi pi-book',
            command: () => { navigate('/ListarLibros') }
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-user',
          items: [
              {
                label: 'Usuarios',
                icon: 'pi pi-file-plus',
                command: () => { navigate('/usuario') }
              },
              {
                label: 'Agregar Rol',
                icon: 'pi pi-user-plus',
                command: () => { navigate('/rol') }
              }
           ]
        },
        {
          label: 'Categorias',
          icon: 'pi pi-cog',
          command: () => { navigate('/Categorias') }
        },
        {
          label: 'Libros en prestamo',
          icon: 'pi pi-book',
          items:[
            {
              label: 'ver prestamos',
              icon: 'pi pi-bars',
              command: () => { navigate('/Prestamos') }
            },
            {
              label: 'Crear estado',
              icon: 'pi pi-cog',
              command: () => { navigate('/Estado') }
            },
          ]
      },
      {
          label: 'Estadisticas',
          icon: 'pi pi-chart-bar',
          command: () => { navigate('/Graficas') }
      },
      {
        label: 'Cerrar Sesion',
        icon: 'pi pi-sign-out',
        command: () => { location.reload() }
      },
  ];
  if(DatosUsuario.idRol !== 1){
    items.splice(1,1)
    items.splice(4,1)
  }
  return (
      <div >
        {!sesion ? 
          (<Login  SetSesion={SetSesion} SetDatosUsuario={SetDatosUsuario}/>) :
          (
            <>
              <Menubar className="cardMenu" model={items}  >
                
              </Menubar>
              <div className="menu">
                  <Routes>
                      <Route path="/" element={<Libros/>} />
                      <Route path="/ListarLibros" element={<Libros/>} />
                      <Route path="/Categorias" element={<Categorias/>} />
                      <Route path="/Prestamos" element={<Prestamos/>} />
                      <Route path="/Estado" element={<CrearEstado/>} />
                      <Route path="/usuario" element={<Usuarios/>} />
                      <Route path="/rol" element={<CrearRol/>} />
                      <Route path="/Graficas" element={<Graficas/>} />
                  </Routes>
              </div>
            </>
          )
        }
      </div>
  )
}
 
export default App