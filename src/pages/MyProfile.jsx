import React from "react";
import { Link } from "react-router-dom";
const styles = { fontFamily: "Oleo Script" };

function MyProfile() {
  return (
    <>
      <form
        classaction=""
        className="bg-gray-300 rounded-xl my-1 md:my-2 xl:my-4 w-full  lg:w-7/8 2xl:w-4/5 mx-auto p-8 shadow-lg"
      >
        <div>
          <h1
            className="text-indigo-900 block text-6xl font-bold text-center"
            style={styles}
          >
            Mi <span className="text-black">perfil</span>
          </h1>
        </div>

        <div>
          <div className="my-10 mx-5">
            <label className="text-black block text-xl font-bold">Nombre</label>
            <input
              type="text"
              placeholder="Ejemplo"
              className="border w-full p-3 mt-3 rounded-xl placeholder:text-black"
              disabled
            />
          </div>
          <div className="my-10 mx-5">
            <label className="text-black block text-xl font-bold">Correo</label>
            <input
              type="email"
              placeholder="ejemplo@ejemplo.com"
              className="border w-full p-3 mt-3 rounded-xl  placeholder:text-black"
              disabled
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default MyProfile;
