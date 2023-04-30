import React from "react";
import Alerta from "../components/Alerta";
import { useState } from "react";

const CreateHistory = () => {
  const [nombre, getNombre] = useState("");
  const [doc, getDoc] = useState("");
  const [edad, getEdad] = useState("");
  const [ocupacion, getOcupacion] = useState("");
  const [genero, getGenero] = useState("");
  const [estadocivil, getEstadoCivil] = useState("");
  const [antMed, getAntMed] = useState("");
  const [antPsi, getAntPsi] = useState("");
  const [plan, getPlan] = useState("");
  const [observaciones, getObservaciones] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, doc, edad, ocupacion,genero,estadocivil,antMed,antPsi,plan,observaciones].includes("")) {
      setAlerta({ msg: "Hay valores vacios", err: true });
      console.log("Hay valores vacios");
      return;
    }
    if (isNaN(documento)) {
      setAlerta({ msg: "El documento introducido no es valido", err: true });
      console.log("El documento introducido no es valido");
      return;
    }

    setAlerta({ msg: "Historia creada" , err: false});
  }

  const { msg } = alerta;

  return (
    <>
      <form
        classaction=""
        className="bg-gray-300 rounded-xl my-1 md:my-2 xl:my-4 w-full  mx-auto p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
      {msg && <Alerta alerta={alerta} />}
        <div>
          <div>
            <h1 className="text-black block text-6xl font-bold text-center ">
              Nueva Historia
            </h1>
            <aside className="w-1/5 ml-auto">
              <input
                type="submit"
                value="Registrar historia"
                className="bg-black text-white my-5 mx-auto w-full h-10 rounded-xl font-normal mt-5 hover:cursor-pointer hover:bg-gray-700"
              />
            </aside>
          </div>
          <div className="my-10 mx-5">
            <div className=" flex justify-between">
              <label className="text-black block text-xl font-bold">
                Nombre
              </label>
              <label className="text-black block text-xl font-bold">
                Documento
              </label>
            </div>
            <div className=" flex justify-between">
              <input
                type="text"
                placeholder="Nombre del paciente"
                className="border w-5/12 p-3 mt-3 rounded-xl"
                value={nombre}
                onChange={(e) => getNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="N. de documento"
                className="border w-5/12 p-3 mt-3 rounded-xl float-right"
                value={doc}
                onChange={(e) => getDoc(e.target.value)}
              />
            </div>
          </div>
          <div className="my-10 mx-5">
            <div className="flex justify-between">
              <label className="text-black block text-xl font-bold">Edad</label>
              <label className="text-black block text-xl font-bold">
                Ocupacion
              </label>
            </div>
            <div className=" flex justify-between">
              <input
                type="number"
                placeholder="Edad"
                className="border w-5/12 p-3 mt-3 rounded-xl"
                value={edad}
                onChange={(e) => getEdad(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ocupacion"
                className="border w-5/12 p-3 mt-3 rounded-xl float-right"
                value={ocupacion}
                onChange={(e) => getOcupacion(e.target.value)}
              />
            </div>
          </div>
          <div className="my-10 mx-5">
            <div className="flex justify-between">
              <label className="text-black block text-xl font-bold">
                Genero
              </label>
              <label className="text-black block text-xl font-bold">
                Estado civil
              </label>
            </div>

            <div className=" flex justify-between">
              <select
                name="Genero"
                id="Genero"
                className="border w-5/12 p-3 mt-3 rounded-xl"
                value={genero}
                onChange={(e) => getGenero(e.target.value)}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="NN">NS/NR</option>
              </select>
              <input
                type="text"
                placeholder="Estado civil"
                className="border w-5/12 p-3 mt-3 rounded-xl float-right"
                value={estadocivil}
                onChange={(e) => getEstadoCivil(e.target.value)}
              />
            </div>
          </div>
          <div className="my-10 mx-5">
            <label className="text-black block text-xl font-bold">
              Antecedentes medicos
            </label>
            <textarea
              className="border w-full h-96 p-3 mt-3 rounded-xl"
              name="Antecedentes medicos"
              placeholder="Introduce los antecedentes medicos..."
              id="antecedentesmed"
              cols="30"
              rows="10"
              value={antMed}
              onChange={(e) => getAntMed(e.target.value)}
            ></textarea>
          </div>

          <div className="my-10 mx-5">
            <label className="text-black block text-xl font-bold">
              Antecedentes psicologicos
            </label>
            <textarea
              className="border w-full h-96 p-3 mt-3 rounded-xl"
              name="Antecedentes psicologicos"
              placeholder="Introduce los antecedentes psicologicos..."
              id="antecedentespsi"
              cols="30"
              rows="10"
              value={antPsi}
              onChange={(e) => getAntPsi(e.target.value)}
            ></textarea>
          </div>

          <div className="my-10 mx-5">
            <label className="text-black block text-xl font-bold">
              Plan de tratamiento
            </label>
            <textarea
              className="border w-full h-96 p-3 mt-3 rounded-xl"
              name="Plan de tratamiento"
              placeholder="Plan de tratamiento"
              id="plantrata"
              cols="30"
              rows="10"
              value={plan}
              onChange={(e) => getPlan(e.target.value)}
            ></textarea>
          </div>

          <div className="my-10 mx-5">
            <label className="text-black block text-xl font-bold">
              Observaciones
            </label>
            <textarea
              className="border w-full h-96 p-3 mt-3 rounded-xl"
              name="Observaciones"
              placeholder="Observaciones"
              id="observaciones"
              cols="30"
              rows="10"
              value={observaciones}
              onChange={(e) => getObservaciones(e.target.value)}
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateHistory;
