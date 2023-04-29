import React from 'react';

function CreateHistory() {
  return (
    <>
      <form
        classaction=""
        className="bg-gray-300 rounded-xl my-1 md:my-2 xl:my-4 w-full sm:w-full md:w-full lg:w-7/8 xl:w-3/4 2xl:w-max 2xl:max-w-xl mx-auto p-8 shadow-lg"
      >
        <div>
          <h1 className="text-black block text-6xl font-bold text-center ">Registrar Historia</h1>
        </div>
        <div className='my-10 mx-5'>
          <div className=" flex justify-between">
            <label className="text-black block text-xl font-bold">Nombre</label>
            <label className="text-black block text-xl font-bold">Estado civil</label>
          </div>
          <input
            type="text"
            placeholder="Nombre del paciente"
            className="border w-72 p-3 mt-3 rounded-xl"
          />
          <input
            type="text"
            placeholder="Estado civil"
            className="border w-72 p-3 mt-3 rounded-xl float-right"
          />
        </div>
        <div className='my-10 mx-5'>
          <div className="flex justify-between">
            <label className="text-black block text-xl font-bold">Edad</label>
            <label className="text-black block text-xl font-bold">Ocupacion</label>
          </div>
          <input
            type="number"
            placeholder="Edad del paciente"
            className="border w-72 p-3 mt-3 rounded-xl"
          />
          <input
            type="text"
            placeholder="Ocupacion"
            className="border w-72 p-3 mt-3 rounded-xl float-right"
          />
        </div>
        <div className='my-10 mx-5'>
          <div className="flex justify-between">
            <label className="text-black block text-xl font-bold">Genero</label>
            <label className="text-black block text-xl font-bold">Telefono</label>
          </div>
          <select name="Genero" id="Genero" className='border w-72 p-3 mt-3 rounded-xl'>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="NN">NS/NR</option>
          </select>
          <input
            type="text"
            placeholder="Ocupacion"
            className="border w-72 p-3 mt-3 rounded-xl float-right"
          />
        </div>
        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Antecedentes medicos</label>
          <textarea className="border w-full h-96 p-3 mt-3 rounded-xl" name="Antecedentes medicos" placeholder="Introduce los antecedentes medicos..." id="antecedentesmed" cols="30" rows="10"></textarea>
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Antecedentes psicologicos</label>
          <textarea className="border w-full h-96 p-3 mt-3 rounded-xl" name="Antecedentes psicologicos" placeholder="Introduce los antecedentes psicologicos..." id="antecedentespsi" cols="30" rows="10"></textarea>
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Plan de tratamiento</label>
          <textarea className="border w-full h-96 p-3 mt-3 rounded-xl" name="Plan de tratamiento" placeholder="Plan de tratamiento" id="plantrata" cols="30" rows="10"></textarea>
        </div>

        <div className="my-10 mx-5">
          <label className="text-black block text-xl font-bold">Observaciones</label>
          <textarea className="border w-full h-96 p-3 mt-3 rounded-xl" name="Observaciones" placeholder="Observaciones" id="observaciones" cols="30" rows="10"></textarea>
        </div>
        
      </form>
    </>
  );
}

export default CreateHistory;
