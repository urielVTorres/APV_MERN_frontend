import Alerta from "../components/Alertas"
import {useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false)
    const [modificado, setModificado] = useState(false);
    const params = useParams();
    const {token} = params;

    useEffect(()=>{
        const comprobarToken = async ()=>{
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg:"Ocurrió un error con el enlace",
                    error:true
                })
            }
        }
        comprobarToken()
    }, [])
    const {msg} = alerta;

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(password.length < 6){
            setAlerta({
                msg: 'La contraseña debe contener mínimo 6 caracteres.',
                error: true
            })
            return;
        }
        if(password !== confirmarPassword){
            setAlerta({
                msg: 'Las contraseñas no coinciden.',
                error: true
            })
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url, {password});
            setAlerta({msg: "Tu contraseña ha sido actualizada"});
            setModificado(true);
            return;
        }catch(error){
            setAlerta({msg: "Ocurrió un error al cambiar la contraseña.", error:true});
        }
        
    }
  return (
    <>
        <div className="my-auto md:my-auto">
            <h1 className="text-indigo-600 font-black text-6xl">
                Reestablece tu contraseña y no pierdas acceso a tus <span className="text-black">Pacientes</span>
            </h1>
        </div>
        <div className="my-auto md:my-auto shadow-lg px-5 py-5 rounded-xl bg-white">
            {msg && <Alerta 
            alerta = {alerta}/>
            }

            {tokenValido && 
                <form onSubmit={handleSubmit} >
                    <div className="my-5">
                        <label
                        htmlFor="password"
                        className=" text-gray-600 block text-xl  font-bold"
                        children="Nueva contraseña"
                        />
                        <input
                        id="password"
                        className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
                        type="password"
                        placeholder="Crea una contraseña"
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
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
                        value = {confirmarPassword}
                        onChange = {e => setConfirmarPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                        type="submit"
                        value="Cambiar Contraseña"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white  font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
                        />
                    </div>
                    {
                        modificado &&
                        <nav className="my-5 block text-center">
                            <Link className="text-indigo-500 font-bold" to="/">Iniciar Sesión</Link>
                        </nav>
                    }
                </form>
            }
            </div>
    </>
  )
}

export default NuevoPassword