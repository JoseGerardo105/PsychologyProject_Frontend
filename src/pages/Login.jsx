import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"



const Login = () => {
  const [nombre, getNombre] = useState('')
  const [password, getPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre,password].includes('')) {
        setAlerta({msg:'Hay valores vacios'})
        console.log("Hay valores vacios")
        return;
    }
    setAlerta({msg:'Todo bien'})

  }


  return (
    <>
            <form classaction="" className="bg-blue-900 rounded-xl my-56 w-max shadow-lg" onSubmit={handleSubmit}>
                <Alerta alerta = {alerta}/>
                <div className="my-10 mx-5">
                    <label className="text-white block text-xl font-bold">
                        E-mail
                    </label>
                    <input type="email" placeholder="Introduce tu e-mail" className="border w-full p-3 mt-3 rounded-xl" value={nombre} onChange={ e=> getNombre(e.target.value)}/>
                    
                </div>
                <div className="my-5 mx-5">
                    <label className="text-white block text-xl font-bold">
                        Contraseña
                    </label>
                    <input type="password" placeholder="Introduce tu contraseña" className="border w-full p-3 mt-3 rounded-xl" value={password} onChange={ e=> getPassword(e.target.value)}/>
                </div>
                    
                <input type="submit" value= "Iniciar Sesión" className="bg-white my-5 mx-40 rounded-xl font-normal mt-5 w-64 h-10 hover:cursor-pointer hover:bg-gray-200"/>
               
            <nav className="mt-5 lg:flex lg:justify-between my-5 mx-5 underline">
                <Link className="block text-center text-white" to="/register">
                    No tienes una cuenta? <span className=" hover:cursor-pointer">Registrate</span>
                </Link>
                <Link className="block text-center text-white" to="/restore-account">
                    Olvide mi contraseña
                </Link>
            </nav>
                
            </form>


    </>
  )
}

export default Login