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
    if (!email) {
      setAlerta({ msg: "Se requiere correo electrónico" });
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setAlerta({ msg: "Ingrese un correo electrónico válido" });
      return;
    }
    try {
      const response = await axios.patch(
        "http://localhost:4000/api/psychologists/change-password/",
        { email: email }
      );
      if (response.data.msg) {
        setAlerta({ msg: response.data.msg });
        navigate("/");
      } else {
        setAlerta({ msg: "Error al enviar las instrucciones" });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        // Muestra un mensaje de error específico desde el backend
        setAlerta({ msg: error.response.data.error });
      } else {
        setAlerta({ msg: "Error al enviar las instrucciones" });
      }
    }
  };
  return (
    <form
      classaction=""
      className="bg-blue-900 rounded-xl my-1 md:my-2 xl:my-4 w-full sm:w-full md:w-full lg:w-7/8 xl:w-3/4 2xl:w-max 2xl:max-w-xl mx-auto p-8 shadow-lg"
      onSubmit={handleSubmit}
    >
      {" "}
      <Alerta alerta={alerta} />{" "}
      <div className="my-5 mx-5">
        {" "}
        <label className="text-white block text-xl font-bold">
          E-mail
        </label>{" "}
        <input
          type="email"
          placeholder="Introduce tu e-mail"
          className="border w-full p-3 mt-3 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
      </div>
      <input
        type="submit"
        value="Enviar instrucciones"
        className="bg-white my-5 mx-auto w-full h-10 rounded-xl font-normal mt-5 hover:cursor-pointer hover:bg-gray-200"
      />
      <nav className="mt-5 lg:flex lg:justify-between my-5 mx-5 underline">
        {" "}
        <Link className="text-white align-middle" to="/">
          {" "}
          Volver atras{" "}
        </Link>{" "}
      </nav>{" "}
    </form>
  );
};
export default MailForPassword;
