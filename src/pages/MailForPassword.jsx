import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";
const MailForPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !repetirPassword) {
      setAlerta({ msg: "Se requiere correo electrónico y nueva contraseña" });
      return;
    }
    if (password.length < 8) {
      setAlerta({
        msg: "La nueva contraseña debe tener al menos 8 caracteres",
      });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden." });
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:4000/api/psychologists/change-password",
        { email: email, newPassword: password }
      );
      if (response.data.message) {
        setAlerta({ msg: "Contraseña modificada correctamente" });
        navigate("/");
      } else {
        setAlerta({ msg: "Error al cambiar la contraseña" });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        // Muestra un mensaje de error específico desde el backend
        setAlerta({ msg: error.response.data.error });
      } else {
        setAlerta({ msg: "Error al cambiar la contraseña" });
      }
    }
  };

  return (
    <form
      classaction=""
      className="bg-blue-900 rounded-xl my-6 md:my-12 xl:my-20 w-max shadow-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <Alerta alerta={alerta} />
      <div className="my-5 mx-5">
        <label className="text-white block text-xl font-bold">E-mail</label>
        <input
          type="email"
          placeholder="Introduce tu e-mail"
          className="border w-full p-3 mt-3 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      


      <input
        type="submit"
        value="Enviar instrucciones"
        className="bg-white my-5 mx-40 rounded-xl font-normal mt-5 w-64 h-10 hover:cursor-pointer hover:bg-gray-200"
      />

      <nav className="mt-5 lg:flex lg:justify-between my-5 mx-5 underline">
        <Link className="text-white align-middle" to="/">
          Volver atras
        </Link>
      </nav>
    </form>
  );
};

export default MailForPassword;
