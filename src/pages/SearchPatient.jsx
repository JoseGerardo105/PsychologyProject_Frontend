import React, { useState, useEffect } from "react";
import axiosClient from "../config/axios";
import { Delete, Save } from "@material-ui/icons";
const styles = { fontFamily: "Oleo Script" };
import Alerta from "../components/Alerta";

const SearchPatient = () => {
  const [datos, setDatos] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (alerta.msg) {
      const timer = setTimeout(() => {
        setAlerta({});
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alerta]);

  const enableEdit = (id, type) => {
    console.log("Lo que entro fue: " + id + " " + type);
    setIsEditable(true);
    setId(id);
    setType(type);
  };

  const edit = () => {
    setIsEditable(false);
  };

  const deletePatient = async (id) => {
    console.log("Id a borrar" + id);
    try {
      await axiosClient.delete(`/psychologists/delete-patient/${id}`);
      fetchPatients();
      setAlerta({ msg: "Paciente eliminado exitosamente", err: false });
    } catch (error) {
      setAlerta({
        msg: "Hubo un error a la hora de eliminar el paciente",
        err: true,
      });
      throw error;
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axiosClient.get("/psychologists/get-patients");
      const patients = response.data;
      console.log("estructura de pacientes:", patients[0]);
      setDatos(patients);
      console.log("Pacientes cargados: ", patients);
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };

  const rowStyle = {
    backgroundColor: "#DEDEDE",
  };

  const handleNewValue = (event) => {
    setValue(event.target.value);
    console.log("Nuevo valor " + value + "Id: " + id + "Campo: " + type);
  };

  const editPatient = async (patientData) => {
    try {
      // Aca se implementa la logica del patch
    } catch (error) {
      throw error;
    }
  };

  const { msg } = alerta;

  return (
    <div>
      {msg && <Alerta alerta={alerta} />}
      <h1
        className="text-indigo-900 block text-6xl font-bold text-center float-left "
        style={styles}
      >
        Mis <span className="text-black">pacientes</span>
      </h1>
      <div className="float-right w-1/3 focus:outline-none py-2 px-4">
        <form action="">
          <input
            type="text"
            placeholder="Buscar"
            className=" border w-3/5 p-3  rounded-xl focus:ring-indigo-500 focus:border-indigo-500 mt-5 h-10"
          />
          <input
            type="submit"
            value="Buscar paciente"
            className="bg-black text-white my-5 mx-auto w-1/3 h-10 rounded-xl font-normal mt-5 hover:cursor-pointer hover:bg-gray-200 float-right"
          />
        </form>
      </div>

      <table className="table-auto border rounded-xl w-full border-gray-400 px-4 py-2 bg-gray-100 text-gray-800 text-center text-base flex-col sm:flex-row">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Documento</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Dirección</th>
          </tr>
        </thead>
        <tbody className=" bg-slate-500">
          {datos.map((dato, index) => (
            <tr key={index} style={rowStyle}>
              <td className="border px-4 py-2">
                {isEditable && id == dato.id && type == "Nombre" ? (
                  <input
                    className="w-full h-full border-collapse rounded-xl text-center"
                    type="text"
                    defaultValue={dato.name}
                    onChange={handleNewValue}
                  ></input>
                ) : (
                  <label onDoubleClick={() => enableEdit(dato.id, "Nombre")}>
                    {dato.name}
                  </label>
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditable && id == dato.id && type == "Documento" ? (
                  <input
                    className="w-full h-full border-collapse rounded-xl text-center"
                    type="text"
                    defaultValue={dato.document_number}
                    onChange={handleNewValue}
                  ></input>
                ) : (
                  <label onDoubleClick={() => enableEdit(dato.id, "Documento")}>
                    {dato.document_number}
                  </label>
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditable && id == dato.id && type == "Email" ? (
                  <input
                    className="w-full h-full border-collapse rounded-xl text-center"
                    type="text"
                    defaultValue={dato.email}
                    onChange={handleNewValue}
                  ></input>
                ) : (
                  <label onDoubleClick={() => enableEdit(dato.id, "Email")}>
                    {dato.email}
                  </label>
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditable && id == dato.id && type == "Telefono" ? (
                  <input
                    className="w-full h-full border-collapse rounded-xl text-center"
                    type="text"
                    defaultValue={dato.phone}
                    onChange={handleNewValue}
                  ></input>
                ) : (
                  <label onDoubleClick={() => enableEdit(dato.id, "Telefono")}>
                    {dato.phone}
                  </label>
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditable && id == dato.id && type == "Direccion" ? (
                  <input
                    className="w-full h-full border-collapse rounded-xl text-center"
                    type="text"
                    defaultValue={dato.address}
                    onChange={handleNewValue}
                  ></input>
                ) : (
                  <label onDoubleClick={() => enableEdit(dato.id, "Direccion")}>
                    {dato.address}
                  </label>
                )}
              </td>
              <td className="border px-4 py-2 underline text-blue-800 cursor-pointer">
                <Delete
                  className="cursor-pointer float-left"
                  onClick={() => deletePatient(dato.id)}
                />
                {isEditable && id == dato.id ? (
                  <Save className="cursor-pointer float-right" onClick={edit} />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPatient;
