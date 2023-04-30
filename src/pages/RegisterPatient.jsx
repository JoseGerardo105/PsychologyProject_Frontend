import React from "react";
import Alerta from "../components/Alerta";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPatient = () => {
  const [nombre, getNombre] = useState("");
  const [tipodoc, getTipoDoc] = useState("");
  const [documento, getDoc] = useState("");
  const [email, getEmail] = useState("");
  const [telefono, getTelefono] = useState("");
  const [direccion, getDireccion] = useState("");

  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, tipodoc, documento, email,telefono,direccion].includes("")) {
      setAlerta({ msg: "Hay valores vacios", err: true });
      console.log("Hay valores vacios");
      return;
    }
    if (isNaN(documento)) {
      setAlerta({ msg: "El documento introducido no es valido", err: true });
      console.log("El documento introducido no es valido");
      return;
    }

    if (isNaN(telefono) || telefono.length != 7) {
      setAlerta({ msg: "El telefono introducido no es valido", err: true });
      console.log("El telefono introducido no es valido");
      return;
    }
    setAlerta({ msg: "Usuario creado" , err: false});
    navigate("/home")
  }

  const { msg } = alerta;

  return (
    <>
      <form
        classaction=""
        className="bg-gray-300 rounded-xl my-1 md:my-2 xl:my-4 w-full sm:w-full md:w-full lg:w-7/8 xl:w-3/4 mx-auto p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}
        <div>
          <h1 className="text-black block text-6xl font-bold text-center ">
            Registro Paciente
          </h1>
        </div>
        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Nombre</label>
          <input
            type="text"
            placeholder="Nombre del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
            value={nombre}
            onChange={(e) => getNombre(e.target.value)}
          />
        </div>
        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">
            Documento
          </label>
          <select
            name="Tipo"
            id="Tipo"
            className="border w-1/4 p-3 mt-3 rounded-xl"
            value={tipodoc}
            onChange={(e) => getTipoDoc(e.target.value)}
          >
            <option value="CC">Cedula de Ciudadania</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cedula de Extranjeria</option>
            <option value="PP">Pasaporte</option>
          </select>
          <input
            type="text"
            placeholder="Num. de identidad"
            className="border w-3/4 p-3 mt-3 rounded-xl"
            value={documento}
            onChange={(e) => getDoc(e.target.value)}
          />
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Correo</label>
          <input
            type="e-mail"
            placeholder="E-mail del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
            value={email}
            onChange={(e) => getEmail(e.target.value)}
          />
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Telefono</label>
          <input
            type="text"
            placeholder="Telefono del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
            value={telefono}
            onChange={(e) => getTelefono(e.target.value)}
          />
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">
            Direccion
          </label>
          <input
            type="text"
            placeholder="Direccion del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
            value={direccion}
            onChange={(e) => getDireccion(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Registrar"
          className="bg-black my-5 mx-auto w-full h-10 rounded-xl font-normal mt-5 hover:cursor-pointer hover:bg-gray-200 text-white"
        />
      </form>
    </>
  );
};

export default RegisterPatient;
