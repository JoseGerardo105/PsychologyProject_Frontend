import React, { Component } from "react";
import axios from "axios";
import axiosClient from "../config/axios";
import { useState } from "react";
import { Spa } from "@material-ui/icons";

class SearchPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
    };
  }

  fetchPatients = async () => {
    try {
      const response = await axiosClient.get("/psychologists/get-patients");
      const patients = response.data;
      console.log("estructura de aocientes:", patients[0]);
      this.setState({ datos: patients });
      console.log("Pacientes cargados: ", patients);
      return patients;
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };
  componentDidMount() {
    this.fetchPatients();
  }

  render() {
    // const [searchTerm, setSearchTerm] = useState("");
    const rowStyle = {
      backgroundColor: "#DEDEDE",
    };
    return (
      <div>
        <h1 className="text-black block text-4xl font-bold text-center float-left ">
          Mis pacientes
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
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Dirección</th>
            </tr>
          </thead>
          <tbody className=" bg-slate-500">
            {this.state.datos.map((dato, index) => (
              <tr key={index} style={rowStyle}>
                <td className="border px-4 py-2">{dato.name}</td>
                <td className="border px-4 py-2">{dato.document_number}</td>
                <td className="border px-4 py-2">{dato.email}</td>
                <td className="border px-4 py-2">{dato.phone}</td>
                <td className="border px-4 py-2">{dato.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchPatient;
