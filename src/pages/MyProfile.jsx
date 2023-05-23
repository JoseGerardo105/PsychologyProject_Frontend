import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const styles = { fontFamily: "Oleo Script" };

const useStyles = makeStyles({
  icon: {
    fontSize: "16rem",
  },
});

function MyProfile() {
  const classes = useStyles();

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
        <div className="flex justify-between">
          <div className="w-1/4">
            <AccountCircleIcon className={classes.icon} />
          </div>

          <div className="w-2/4">
            <div className="my-10 mx-5">
              <label className="text-black block text-xl font-bold">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Ejemplo"
                className="border w-full p-3 mt-3 rounded-xl placeholder:text-black"
                disabled
              />
            </div>
            <div className="my-10 mx-5">
              <label className="text-black block text-xl font-bold">
                Correo
              </label>
              <input
                type="email"
                placeholder="ejemplo@ejemplo.com"
                className="border w-full p-3 mt-3 rounded-xl  placeholder:text-black"
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default MyProfile;
