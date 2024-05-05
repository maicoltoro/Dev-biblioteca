import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';
import { G_usuario } from '../../servicios/Graficas';

export function GraficaUser(){
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [Nombres,setNombres] =useState(null)
    const [Cantidad,setCantidad] =useState(null)

    useEffect(() =>{
        const TraerDatos = async () =>{
            const Data = await G_usuario()
            let newNombre=[]
            let newCantidad=[]
            for(let i = 0; i <Data.length; i++){
                newNombre.push(Object.values(Data[i])[1])
                newCantidad.push(Object.values(Data[i])[0])
            }
            
            setNombres(newNombre)
            setCantidad(newCantidad)
        }
        TraerDatos()
    },[])
    
    useEffect(() => {       
        const data = {
            labels: Nombres,
            datasets: [
                {
                    label: 'Usuarios',
                    data: Cantidad,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [Nombres,Cantidad]);

    return (
        <div className="card">
            <h1>Grafica por usuarios</h1>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}

        