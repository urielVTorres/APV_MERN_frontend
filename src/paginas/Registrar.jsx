import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alertas';
import clienteAxios from "../config/axios"

const Registrar =  () => {
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');
    const [alerta, setAlerta] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault()
        //Validación
        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({msg:'Todos los campos son obligatorios', error: true});
            return;
        }
        if(password.length <6){
            setAlerta({msg:"La contraseña debe contener más de 6 caracteres", error: true});
            return;
        }
        if(password !== repetirPassword){
            setAlerta({msg: "Las contraseñas no coinciden", error: true});
            return;
        }
        setAlerta({})

        // Crear el usuario en la API, comunicación con el backend, bby
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/`;
            const respuesta = await clienteAxios.post(url, { nombre, email, password });
            setAlerta({msg:'¡Usuario Registrado Correctamente! Revisa tu email para confirmar tu cuenta'});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            setAlerta({msg: error.response.data.msg, error: true});
        }
        

    }
    const {msg} = alerta;
    return (
        <>
        <div className="my-auto md:my-auto">
            <h1 className="text-indigo-600 font-black text-6xl">
                Crea tu cuenta y Administra tus <span className="text-black">Pacientes</span>
            </h1>
        </div>

        <div className="my-auto md:my-auto shadow-lg px-5 py-5 rounded-xl bg-white">
            {msg && <Alerta 
                alerta={alerta}
            />}
            <form  onSubmit={e=>{handleSubmit(e)}} >
            <div className="my-5">
                <label
                htmlFor="nombre"
                className=" text-gray-600 block text-xl  font-bold"
                children="Nombre"
                />
                <input
                id="nombre"
                className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={ e => setNombre(e.target.value)}
                />
            </div>
                <div className="my-5">
                <label
                    htmlFor="email"
                    className=" text-gray-600 block text-xl  font-bold"
                    children="Email"
                />
                <input
                    id="email"
                    className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
                    type="email"
                    placeholder="Email de Registro"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
                </div>

                <div className="my-5">
                    <label
                    htmlFor="password"
                    className=" text-gray-600 block text-xl  font-bold"
                    children="Contraseña"
                    />
                    <input
                    id="password"
                    className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
                    type="password"
                    placeholder="Crea una contraseña"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                    htmlFor="confirmar-password"
                    className=" text-gray-600 block text-xl  font-bold"
                    children="Confirmar Contraseña"
                    />
                    <input
                    id="confirmar-password"
                    className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
                    type="password"
                    placeholder="Confirma contraseña"
                    value={repetirPassword}
                    onChange={ e => setRepetirPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="submit"
                    value="Registrar"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white  font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
                   
                    />
                </div>
                <nav className="my-5 block text-center">
                    <p className="my-2">
                    ¿Ya tienes una cuenta? <Link className="text-indigo-500 font-bold" to="/">Inicia Sesión</Link>
                    </p>
                </nav>
            </form>
            </div>
        </>
    )
}

export default Registrar