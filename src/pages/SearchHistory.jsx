import React, { Component } from "react";
import axiosClient from "../config/axios";
const styles = { fontFamily: "Oleo Script" };
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

class SearchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
    };
  }

  fetchPatientName = async (patientId) => {
    try {
      const response = await axiosClient.get(
        `/psychologists/get-patient/${patientId}`
      );
      const patient = response.data;
      console.log("nombre del pacienre", patient.name);
      return patient.name;
    } catch (error) {
      console.error("Error al obtener el paciente:", error);
      return null;
    }
  };
  fetchMedicalRecords = async () => {
    try {
      const response = await axiosClient.get(
        "/psychologists/get-medical-records"
      );
      const medicalRecords = response.data;
      for (let record of medicalRecords) {
        record.patient_name = await this.fetchPatientName(record.patient_id);
      }
      this.setState({ datos: medicalRecords });
      return medicalRecords;
    } catch (error) {
      console.error("Error al obtener los registros medicos:", error);
    }
  };

  componentDidMount() {
    this.fetchMedicalRecords();
  }

  deleteHistory = async (id) => {
    console.log("Id a borrar" + id);
    try {
      await axiosClient.delete(`/psychologists/delete-medical-record/${id}`);
      this.fetchMedicalRecords();
    } catch (error) {
      throw error;
    }
  };

  render() {
    const rowStyle = {
      backgroundColor: "#DEDEDE",
    };
    return (
      <div>
        <h1
          className="text-indigo-900 block text-6xl font-bold text-center float-left "
          style={styles}
        >
          Mis <span className="text-black">historias</span>
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
              value="Buscar historia"
              className="bg-black text-white my-5 mx-auto w-1/3 h-10 rounded-xl font-normal mt-5 hover:cursor-pointer hover:bg-gray-200 float-right"
            />
          </form>
        </div>
        <table className="table-auto w-full border-gray-400 px-4 py-2 bg-gray-100 text-gray-800 text-center text-base flex-col sm:flex-row">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Documento</th>
              <th className="px-4 py-2">Historias</th>
            </tr>
          </thead>
          <tbody className=" bg-slate-500">
            {this.state.datos.map((dato, index) => (
              <tr key={index} style={rowStyle}>
                <td className="border px-4 py-2">{dato.patient_name}</td>
                <td className="border px-4 py-2">{dato.document_number}</td>
                <td className="border px-4 py-2 underline cursor-pointer">
                <Link to ={`/home/watch-history?patientId=${dato.id}`}>
                  Ver historia
                </Link>
                </td>
                <td>
                <Delete className="cursor-pointer" onClick={() => this.deleteHistory(dato.id)}  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchHistory;
