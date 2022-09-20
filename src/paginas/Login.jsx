import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alertas";
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState('');
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate('');

    if(auth?._id ) return <Navigate to="/admin" />
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if([email, password].includes('')){
            setAlerta({msg:"Todos los campos son obligatorios.", error:true});
            return;
        }
        try{
            const { data } = await clienteAxios.post(`/veterinarios/login`, {
                email, password
            });
            localStorage.setItem('token', data.token);
            setAuth(data)
            navigate("admin")
            

            
        }catch(error){
            console.log(error)
            setAlerta({msg:error.response.data.msg, error:true})
        }

    }
    const {msg} = alerta;

  return (
    <>
        <div className="md:my-auto">
            <h1 className="text-indigo-600 font-black text-6xl">
                Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
            </h1>
        </div>
        {msg && <Alerta 
            alerta={alerta}/>}
        <div className="mt-auto md:my-auto shadow-lg px-5 py-10 rounded-xl bg-white">
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl  font-bold"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
                        type="email"
                        placeholder="Email de Registro"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    
                </div>
                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl  font-bold"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
                        type="password"
                        placeholder="Tu Contraseña"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
                />
                <nav className="my-5 block text-center">

                    <Link to="/olvide-password" className="text-indigo-500">¿Olvidaste tu contraseña?</Link>
                    <p className="my-2">
                        ¿No tienes una cuenta? <Link className="text-indigo-500 font-bold" to="/registrar">Registrate</Link>
                    </p>
                </nav>
            </form>
        </div>
    </>
  )
}

export default Login;