import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios"
import Alertas from "../components/Alertas";
const ConfirmarCuenta = () => {
    const params = useParams();
    const id = params.id;
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})
    useEffect(()=> {
        const confirmarCuenta = async()=>{
            try {

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`;
                const { data } = await clienteAxios(url);
                console.log(data);
                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg
                });

            } catch (error) {
                setAlerta({msg: error.response.data.msg, error:true})
            }
            setCargando(false)
        }
        confirmarCuenta();
    }, [])

  return (
    <>
        <div className="my-auto md:my-auto">
            <h1 className="text-indigo-600 font-black text-6xl">
                Confirma tu cuenta y comienza a administrar tus <span className="text-black">Pacientes</span>
            </h1>
        </div>

        <div className="my-auto md:my-auto shadow-lg px-5 py-5 rounded-xl bg-white">
            {
            !cargando && <Alertas 
                alerta={alerta}
            />
            }
            {cuentaConfirmada &&
                <Link className="text-indigo-500 font-bold block text-center" to="/">Inicia Sesión</Link>
            }
        </div>
    </>

  )
}

export default ConfirmarCuenta