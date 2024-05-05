/**
 * La función `GraficaLibro` en JavaScript React obtiene datos para un gráfico de anillos que muestra
 * información del libro.
 * @returns El código devuelve un componente funcional llamado "GraficaLibro" que muestra un gráfico de
 * anillos utilizando la biblioteca PrimeReact. El componente obtiene datos para el gráfico del
 * servicio `G_Libro` y luego configura los datos y las opciones del gráfico en función de los datos
 * recuperados. El gráfico muestra la cantidad de libros en diferentes categorías con los colores
 * correspondientes. El componente devuelve una tarjeta que contiene el
 */
import  { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { G_Libro } from '../../servicios/Graficas';

export  function GraficaLibro() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [libro,setLibro] =useState(null)
    const [Cantidad,setCantidad] =useState(null)

    useEffect(() =>{
        const TraerDatos = async () =>{
            const Data = await G_Libro()
            let newNombre=[]
            let newCantidad=[]
            for(let i = 0; i <Data.length; i++){
                newNombre.push(Object.values(Data[i])[1])
                newCantidad.push(Object.values(Data[i])[0])
            }
            
            setLibro(newNombre)
            setCantidad(newCantidad)
        }
        TraerDatos()
    },[])

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: libro,
            datasets: [
                {
                    data: Cantidad,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
    }, [Cantidad, libro]);

    return (
        <div className="card flex justify-content-center">
            <h1>Grafica de libros</h1>
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
        