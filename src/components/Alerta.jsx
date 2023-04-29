import React from 'react'

const Alerta = ({alerta}) => {
    if (!alerta.msg) {
        return null;
    }
  return (
    <div className='${alerta.err ? bg-red-500 : bg-green-500}  text-center p-3 rounded-xl uppercase text-white text-sm font-bold mb-10 alerta'>{alerta.msg} </div>
  )
}

export default Alerta