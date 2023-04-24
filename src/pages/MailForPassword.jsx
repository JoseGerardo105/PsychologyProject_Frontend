import { useState } from "react"
import { Link } from "react-router-dom"

const MailForPassword = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')  
    const [repetirPassword, setPasswordConfirm] = useState('')

    const handleSubmit = async e => {
      e.preventDefault()

}

  return (
    <form classaction="" className="bg-blue-900 rounded-xl my-60 w-max shadow-lg" onSubmit={handleSubmit}>
                <div className="my-5 mx-5">
                    <label className="text-white block text-xl font-bold">
                        Email
                    </label>
                    <input type="email" placeholder="Introduce tu e-mail" className="border w-full p-3 mt-3 rounded-xl" value={email} onChange={ e => setEmail(e.target.value)}/>
                    
                </div>
                <div className="my-5 mx-5">
                    <label className="text-white block text-xl font-bold">
                        Contraseña
                    </label>
                    <input type="password" placeholder="Introduce tu nueva contraseña" className="border w-full p-3 mt-3 rounded-xl" value={password} onChange={ e => setPassword(e.target.value)}/>
                    
                </div>
                <div className="my-5 mx-5">
                    <label className="text-white block text-xl font-bold">
                        Confirmar Contraseña
                    </label>
                    <input type="password" placeholder="Confirma tu nueva contraseña" className="border w-full p-3 mt-3 rounded-xl" value={repetirPassword} onChange={ e => setPasswordConfirm(e.target.value)}/>
                    
                </div>
                    
                <input type="submit" value= "Enviar Instrucciones" className="bg-white my-5 mx-40 rounded-xl font-normal mt-5 w-64 h-10 hover:cursor-pointer hover:bg-gray-200" />
                
                <nav className="mt-5 lg:flex lg:justify-between my-5 mx-5 underline">
                  <Link className="text-white align-middle" to="/">
                      Volver atras
                  </Link>
                </nav>
            </form>
  )
}

export default MailForPassword