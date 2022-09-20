import React from 'react';
import AdminNav from '../components/AdminNav';
import Alerta from '../components/Alertas';
import {useState} from 'react';
import useAuth from '../hooks/useAuth';

function CambiarPassword() {
    const {guardarPassword} = useAuth();
    const [alerta, setAlerta]= useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });

    const handleSubmit = async e =>{
        e.preventDefault();

        if(Object.values(password).some(campo => campo === '')){
            setAlerta({
                msg: 'Todos los campos son obligatorios'
            });
            return;
        }
        if( password.pwd_nuevo.length < 6){
            setAlerta({
                msg:'La contraseña debe contener al menos 6 caracteres',
                error: true
            })
            return;
        }

        const resultado = await guardarPassword(password);
        setAlerta(resultado);
        setPassword({
            pwd_actual:'',
            pwd_nuevo: ''
        })
    }
    const {msg} = alerta;
  return (
    <>
        <AdminNav />
        <h2 className='font-black text-3xl text-center mt-10' >Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center " >Modifica tu <span className='text-indigo-600 font-bold' >contraseña</span></p>
    
        <div className='flex justify-center' >
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5" >
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label 
                            className="uppercase font-bold text-gray-600"
                            children="Contraseña actual"
                            htmlFor='pwd_actual'
                        />
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-3 mb-3 rounded-lg"
                            name="pwd_actual"
                            placeholder='Escribe tu contraseña actual'
                            value={password.pwd_actual}
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                        />
                        <label 
                            className="uppercase font-bold text-gray-600"
                            children="Nueva contraseña"
                            htmlFor='pwd_nuevo'
                        />
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-3 mb-3 rounded-lg"
                            name="pwd_nuevo"
                            placeholder='Escribe tu nueva contraseña'
                            value={password.pwd_nuevo}
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Actualizar Contraseña"
                        className="bg-indigo-700 px-10 font-bold text-white rounded-lg uppercase w-full mt-5 p-2"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword