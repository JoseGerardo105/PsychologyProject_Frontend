import React from 'react'

const ResetPasswordForEnter = () => {
  return (
    <form classaction="" className="bg-blue-900 rounded-xl my-28 w-max shadow-lg">
                <div className="my-10 mx-5">
                    <label className="text-white block text-xl font-bold">
                        Contraseña
                    </label>
                    <input type="password" placeholder="Introduce tu nueva contraseña" className="border w-full p-3 mt-3 rounded-xl"/>
                    
                </div>
                <div className="my-5 mx-5">
                    <label className="text-white block text-xl font-bold">
                        Confirmacion
                    </label>
                    <input type="password" placeholder="Confirma tu contraseña" className="border w-full p-3 mt-3 rounded-xl"/>
                </div>
                    
                <input type="submit" value= "Confirmar" className="bg-white my-5 mx-40 rounded-xl font-normal mt-5 w-64 h-10 hover:cursor-pointer hover:bg-gray-200" />
                
            </form>
  )
}

export default ResetPasswordForEnter