import React, { Component } from "react";
import axiosClient from "../config/axios";

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

  render() {
    const rowStyle = {
      backgroundColor: "#DEDEDE",
    };
    return (
      <div>
        <h1 className="text-black block text-4xl font-bold text-center float-left ">
          Mis historias
        </h1>
        <input
          type="text"
          placeholder="Buscar"
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 float-right w-1/4"
        />
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
                <td className="border px-4 py-2 underline">Ver historia</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchHistory;
