import {createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';

const PacientesContext = createContext();

export const PacientesProvider = ({children})=>{
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({})
    useEffect(()=>{
        const obtenerPacientes = async ()=>{
            try {
                const token = localStorage.getItem("token");
                if(!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        };
        obtenerPacientes();
    }, [])

    const guardarPaciente = async paciente =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(!paciente.id){
            //si es paciente nuevo
            console.log("Creandooo")
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const {creatdeAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
            return;
        }
        //Si el paciente ya existe, editarlo
        console.log("editandooo");
        try {
            const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
            console.log(data)

            const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState )

            setPacientes(pacientesActualizado);

        } catch (error) {
            console.log(error);
        }
        return;
    }

    const setEdicion = paciente =>{
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar el paciente?');
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(confirmar){
            try {
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter( pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
}

export default PacientesContext;