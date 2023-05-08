import React, {Component} from 'react';
import axiosClient from '../config/axios';

class SearchHistory extends Component{
  constructor(props) {
    super(props);
    this.state = {
      datos: []
    };
  }

  componentDidMount() {
    axiosClient.get('/api/datos')
      .then(response => {
        this.setState({ datos: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
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
              <tr key={index}>
                <td className="border px-4 py-2">{dato.nombre}</td>
                <td className="border px-4 py-2">{dato.documento}</td>
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
