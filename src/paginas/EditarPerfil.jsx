import {useEffect, useState} from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alertas';

function EditarPerfil() {

    const {auth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    useEffect(()=>{
        setPerfil(auth);
    },[auth])

    const handleSubmit = async e =>{
        e.preventDefault();
        const {nombre, email } = perfil;

        if([nombre, email].includes("")){
            setAlerta({
                msg:"Email y Nombre son obligatorios", error:true
            });
            return;
        }

        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);
    }
    const {msg} = alerta;  
  return (
    <>
        <AdminNav />
        <h2 className='font-black text-3xl text-center mt-10' >Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center " >Modifica tu <span className='text-indigo-600 font-bold' >información aquí</span></p>

        <div className='flex justify-center' >
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5" >
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label 
                            className="uppercase font-bold text-gray-600"
                            children="Nombre"
                            htmlFor='nombre'
                        />
                        <input 
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-3 mb-3 rounded-lg"
                            name="nombre"
                            value={perfil.nombre || ""}
                            onChange={ e=> setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            }) }
                        />

                        <label 
                            className="uppercase font-bold text-gray-600"
                            children="Sitio Web"
                            htmlFor='web'
                        />
                        <input 
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-3 mb-3 rounded-lg"
                            name="web"
                            value={perfil.web || ""}
                            onChange={ e=> setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            }) }
                        />

                        <label 
                            className="uppercase font-bold text-gray-600"
                            children="Teléfono"
                            htmlFor='telefono'
                        />
                        <input 
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-3 mb-3 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ""}
                            onChange={ e=> setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            }) }
                        />
                        
                        <label 
                            className="uppercase font-bold text-gray-600"
                            children="Correo Electrónico"
                            htmlFor='email'
                        />
                        <input 
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-3 mb-3 rounded-lg"
                            name="email"
                            value={perfil.email || ""}
                            onChange={ e => setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            }) }
                        />
                    </div>

                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-indigo-700 px-10 font-bold text-white rounded-lg uppercase w-full mt-5 p-2"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil