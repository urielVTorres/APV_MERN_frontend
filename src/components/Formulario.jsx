import {useState, useEFfect} from 'react'
import Alerta from "./Alertas";
import usePacientes from "../hooks/usePacientes"
import { useEffect } from 'react';
const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null)
    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setEmail(paciente.email)
            setPropietario(paciente.propietario)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])
    const handleSubmit = e =>{
        e.preventDefault()

        //validar formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            setTimeout(()=>{
                setAlerta({})
            }, 3000)
            return;
        }
        setAlerta({})

        guardarPaciente({ id, nombre, propietario, email, fecha, sintomas })

        setAlerta({msg:"¡Guardado Correctamente!"});
        setTimeout(()=>{
            setAlerta({})
        }, 3000)
        setNombre("");
        setPropietario("")
        setEmail("")
        setFecha("")
        setId(null)
        setSintomas("")
    }
    const {msg} = alerta;
    return (
        <>
            <h2 className='font-black text-3xl text-center' >Administrador de Pacientes</h2>
            
            <p className='text-xl mt-5 mb-10 text-center' >
                Añade tus pacientes y <span className='text-indigo-600 font-bold'>Administralos</span>
            </p>
            
            <form
                className='bg-white py-5 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
                onSubmit={handleSubmit}
            >
                <div className='mb-5'>
                    <label 
                        htmlFor="nombre"
                        className='text-gray-700 font-bold '
                        children="Nombre de la mascota"
                    />
                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Nombre del mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    <label 
                        htmlFor="propietario"
                        className='text-gray-700 font-bold '
                        children="Propietario"
                    />
                    <input 
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                    <label 
                        htmlFor="email"
                        className='text-gray-700 font-bold '
                        children="Correo electronico"
                    />
                    <input 
                        id="email"
                        type="text"
                        placeholder="Email del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label 
                        htmlFor="fecha"
                        className='text-gray-700 font-bold '
                        children="Fecha"
                    />
                    <input 
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                    <label 
                        htmlFor="sintomas"
                        className='text-gray-700 font-bold'
                        children="Sintomas"
                    />
                    <textarea 
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
                    value={id ? "Guardar Cambios" : "Agregar Paciente"}
                />
            </form>
            {msg && <Alerta alerta={alerta}/>}
        </>
    )
}

export default Formulario