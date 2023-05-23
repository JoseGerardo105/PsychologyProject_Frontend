import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
const oleo = { fontFamily: "Oleo Script" };

const Reports = () => {
  const pacientesPorEdad = [10, 15, 20, 5, 3];
  const ingresosGenerales = 25000;

  const pacientesPorEdadChart = {
    labels: ["0-20", "21-40", "41-60", "61-80", "80-100"],
    datasets: [
      {
        label: "Pacientes por edad",
        data: pacientesPorEdad,
        backgroundColor: "rgba(12, 59, 104, 0.8)",
        borderColor: "rgba(12, 59, 104, 1)",
        borderWidth: 1,
      },
    ],
  };

  const opciones = {
    scales: {
      y: {
        max: 30,
        min: 0,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  const styles = {
    fontFamily: "Oleo Script",
    fontSize: "24px",
    lineHeight: "36px",
    background: "#f0f0f0",
    padding: "20px",
    textAlign: "center",
  };

  return (
    <div style={{ background: "#f0f0f0" }} className="rounded-xl">
      <h1 style={oleo} className="text-8xl text-indigo-900">
        Reportes
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
        }}
      ></div>
      <hr className="border-solid border-2 border-black" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
        }}
      >
        <div style={{ width: "45%" }}>
          <h2
            style={oleo}
            className="text-6xl text-indigo-900 align-content-center"
          >
            Pacientes por edad
          </h2>
          <Bar data={pacientesPorEdadChart} options={opciones} />
        </div>
        <hr
          style={{
            border: "none",
            borderLeft: "2px solid black",
            height: "300px",
            margin: "0 2rem",
          }}
        />
        <div style={{ width: "45%" }}>
          <h2 style={oleo} className="text-6xl text-indigo-900">
            Ingresos generales
          </h2>
          <div
            style={oleo}
            className="text-5xl flex items-center justify-center h-full"
          >
            Tus ingresos han sido de ${ingresosGenerales}.
          </div>
        </div>
      </div>
      <hr className="border-solid border-2 border-black" />
      <p
        style={{ ...styles, fontStyle: "italic", marginTop: "20px" }}
        className="rounded-xl"
      >
        En Psynergia nos preocupamos por tu profesión.
      </p>
    </div>
  );
};

export default Reports;
