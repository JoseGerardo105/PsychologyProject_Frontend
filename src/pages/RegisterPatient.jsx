import React from 'react';
import Alerta from "../components/Alerta";
import { useState } from "react";


function RegisterPatient() {

  return (
    <>
      <form
        classaction=""
        className="bg-gray-300 rounded-xl my-1 md:my-2 xl:my-4 w-full sm:w-full md:w-full lg:w-7/8 xl:w-3/4 2xl:w-max 2xl:max-w-xl mx-auto p-8 shadow-lg"
      >
        <div>
          <h1 className="text-black block text-6xl font-bold text-center ">Registrar Paciente</h1>
        </div>
        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Nombre</label>
          <input
            type="text"
            placeholder="Nombre del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
          />
        </div>
        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Documento</label>
          <select name="Tipo" id="Tipo" className='border w-1/4 p-3 mt-3 rounded-xl'>
            <option value="C.C.">C.C</option>
            <option value="T.I.">T.I</option>
          </select>
           <input
            type="text"
            placeholder="Num. de identidad"
            className="border w-3/4 p-3 mt-3 rounded-xl"
          />
        </div>
        
        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Correo</label>
          <input
            type="e-mail"
            placeholder="E-mail del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
          />
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Telefono</label>
          <input
            type="text"
            placeholder="Telefono del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
          />
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Direccion</label>
          <input
            type="text"
            placeholder="Direccion del paciente"
            className="border w-full p-3 mt-3 rounded-xl"
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
}

export default RegisterPatient;
