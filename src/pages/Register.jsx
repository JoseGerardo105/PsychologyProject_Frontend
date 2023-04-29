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
      setAlerta({ msg: "Hay valores vacios", err: true });
      console.log("Hay valores vacios");
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden. ", err: true });
      console.log("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setAlerta({
        msg: "La contraseña no es lo suficientemente larga. Tiene que tener minimo 8 caracteres", err: true
      });
      console.log(
        "La contraseña no es lo suficientemente larga. Tiene que tener minimo 8 caracteres"
      );
      return;
    }

    setAlerta({ msg: "datos correctos" , err: false});

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
        setAlerta({ msg: "Cuenta creada exitosamente" , err: false});
        navigate("/");
      } else {
        setAlerta({ msg: "Error al crear cuenta" , err: true});
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        // Muestra un mensaje de error específico del back
        setAlerta({ msg: error.response.data.error });
      } else {
        setAlerta({ msg: "Error al crear cuenta" , err: true});
      }
    }
  };

  const { msg } = alerta;

  return (
    <>
      <form
        action=""
        className="bg-blue-900 rounded-xl my-1 md:my-2 xl:my-4 w-full sm:w-full md:w-full lg:w-7/8 xl:w-3/4 2xl:w-max 2xl:max-w-xl mx-auto p-8 shadow-lg"
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
            Verficacion Contraseña
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
          className="bg-white my-5 mx-auto w-full h-10 rounded-xl font-normal mt-5 hover:cursor-pointer hover:bg-gray-200"
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
