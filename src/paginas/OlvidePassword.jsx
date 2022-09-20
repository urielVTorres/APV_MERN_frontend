import {useState} from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alertas';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e =>{
        e.preventDefault();

        if(email === "" || email.length < 6){
            setAlerta({msg: "El email es obligatorio.", error: true});
            return;
        }

        try{
            const { data } = await clienteAxios.post("/veterinarios/olvide-password", { email });
            setAlerta({msg: data.msg});
        }catch(error){
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }
    }

    const { msg } = alerta;
  return (
    <>
      <div className='md:my-auto'>
          <h1 className="text-indigo-600 font-black text-6xl">
              Recupera tu cuenta y Administra tus <span className="text-black">Pacientes</span>
          </h1>
      </div>

      <div className="my-auto md:my-auto shadow-lg px-5 py-5 rounded-xl bg-white">
          {
            msg && <Alerta
            alerta={alerta} />
          }
          
          <form onSubmit={handleSubmit}>
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
                placeholder="Introduce tu email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
              type="submit"
              value="Enviar"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white  font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
              />
            </div>

            <nav className="my-5 block text-center">
              <Link className="text-indigo-500 font-bold block my-5" to="/registrar">Crea otra cuenta</Link>
              
              <Link className="text-indigo-500 font-bold block my-5" to="/">Volver a Inicio de Sesión</Link>
            </nav>
          </form>
      </div>
   </>
  )
}

export default OlvidePassword