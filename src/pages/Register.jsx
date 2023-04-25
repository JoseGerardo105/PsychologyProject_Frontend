import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setPasswordConfirm] = useState("");

  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nombre);
    console.log(email);
    console.log(password);
    console.log(repetirPassword);
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay valores vacios" });
      console.log("Hay valores vacios");
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden. " });
      console.log("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setAlerta({
        msg: "La contraseña no es lo suficientemente larga. Tiene que tener minimo 8 caracteres",
      });
      console.log(
        "La contraseña no es lo suficientemente larga. Tiene que tener minimo 8 caracteres"
      );
      return;
    }

    setAlerta({ msg: "datos correctos" });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/psychologists/register",
        {
          name: nombre,
          email: email,
          password: password,
        }
      );

      if (response.data.message) {
        setAlerta({ msg: "Cuenta creada exitosamente" });
        navigate("/");
      } else {
        setAlerta({ msg: "Error al crear cuenta" });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        // Muestra un mensaje de error específico del back
        setAlerta({ msg: error.response.data.error });
      } else {
        setAlerta({ msg: "Error al crear cuenta" });
      }
    }
  };

  const { msg } = alerta;

  return (
    <>
      <form
        classaction=""
        className="bg-blue-900 rounded-xl my-6 md:my-12 xl:my-20 w-max shadow-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <Alerta alerta={alerta} />
        <div className="my-10 mx-5">
          <label className="text-white block text-xl font-bold">Nombre</label>
          <input
            type="text"
            placeholder="Introduce tu nombre"
            className="border w-full p-3 mt-3 rounded-xl"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="my-10 mx-5">
          <label className="text-white block text-xl font-bold">Email</label>
          <input
            type="email"
            placeholder="Introduce tu e-mail"
            className="border w-full p-3 mt-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-10 mx-5">
          <label className="text-white block text-xl font-bold">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className="border w-full p-3 mt-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-10 mx-5">
          <label className="text-white block text-xl font-bold">
            VerficacionContraseña
          </label>
          <input
            type="password"
            placeholder="Verifica tu contraseña"
            className="border w-full p-3 mt-3 rounded-xl"
            value={repetirPassword}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-white my-5 mx-40 rounded-xl font-normal mt-5 w-64 h-10 hover:cursor-pointer hover:bg-gray-200"
        />

        <nav className="mt-5 lg:flex lg:justify-between my-5 mx-5 underline">
          <Link className="text-white align-middle" to="/">
            Ya tienes una cuenta? Inicia sesion.
          </Link>
        </nav>
      </form>
    </>
  );
};

export default Register;
