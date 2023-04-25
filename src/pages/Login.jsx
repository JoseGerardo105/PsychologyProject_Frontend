import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";

const Login = () => {
  const [nombre, getNombre] = useState("");
  const [password, getPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, password].includes("")) {
      setAlerta({ msg: "Hay valores vacios" });
      console.log("Hay valores vacios");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/psychologists/login",
        {
          email: nombre,
          password: password,
        }
      );

      if (response.data.token) {
        // Guarda el token en el almacenamiento local
        localStorage.setItem("token", response.data.token);
        setAlerta({ msg: "Inicio de sesión exitoso" });
        navigate("/home");
      } else {
        setAlerta({ msg: "Error al iniciar sesión" });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        // Muestra un mensaje de error específico desde el backend
        setAlerta({ msg: error.response.data.error });
      } else {
        setAlerta({ msg: "Error al iniciar sesión" });
      }
    }
  };

  return (
    <>
      <form
        classaction=""
        className="bg-blue-900 rounded-xl my-1 md:my-2 xl:my-4 w-full sm:w-full md:w-full lg:w-7/8 xl:w-3/4 2xl:w-max 2xl:max-w-xl mx-auto p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <Alerta alerta={alerta} />
        <div className="my-10 mx-5">
          <label className="text-white block text-xl font-bold">E-mail</label>
          <input
            type="email"
            placeholder="Introduce tu e-mail"
            className="border w-full p-3 mt-3 rounded-xl"
            value={nombre}
            onChange={(e) => getNombre(e.target.value)}
          />
        </div>
        <div className="my-5 mx-5">
          <label className="text-white block text-xl font-bold">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className="border w-full p-3 mt-3 rounded-xl"
            value={password}
            onChange={(e) => getPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-white my-5 mx-auto w-full h-10 rounded-xl font-normal mt-5 hover:cursor-pointer hover:bg-gray-200"
        />

        <nav className="mt-5 lg:flex lg:justify-between my-5 mx-5 underline">
          <Link className="block text-center text-white" to="/register">
            No tienes una cuenta?{" "}
            <span className=" hover:cursor-pointer">Registrate</span>
          </Link>
          <Link className="block text-center text-white" to="/restore-account">
            Olvide mi contraseña
          </Link>
        </nav>
      </form>
    </>
  );
};

export default Login;
