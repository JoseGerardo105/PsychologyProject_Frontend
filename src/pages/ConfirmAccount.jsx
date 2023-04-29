import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Alerta from '../components/Alerta';

function ConfirmAccount() {
  const [confirmAccount, setConfirmAccount] = useState(false);
  const [charging, setCharging] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const {token} = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `http://localhost:4000/api/psychologists/confirm/${token}`;
        const {data} = await axios(url);
        setConfirmAccount(true);
        setAlerta({
          msg: data.msg
        });
      } catch (error) {
        setAlerta({
          msg: "Error, el token ingresado no existe",
          err: true
        });
      }

      setCharging(false);
    }

    confirmAccount();
  }, []);
  return (
  <>
    <div>
      <h1 className='text-indigo-600 font-black text-5xl'>Confirmación cuenta</h1>
      <div className='mt-20 md:mt-28 shadow-lg px-0 py-10 rounded-xl bg-white'>
        {!charging && <Alerta
          alerta={alerta}
        />}
        {confirmAccount && (
          <Link className="block md:mt-28 text-center my-15 text-gray-800" to="/">
          Iniciar sesion.
          </Link>
        )}
      
      </div>
    </div>
    </>
  );

}

export default ConfirmAccount;