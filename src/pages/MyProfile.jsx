import React from 'react';

function MyProfile() {
  return (
    <>
    <form
      classaction=""
      className="bg-gray-300 rounded-xl my-1 md:my-2 xl:my-4 w-full sm:w-full md:w-full lg:w-7/8 xl:w-3/4 2xl:w-max 2xl:max-w-xl mx-auto p-8 shadow-lg"
    >
      <div className='w-1/2'>
        
      </div>
      <div className='w-1/2
      '>
      <div className="my-10 mx-5">
        <label className="text-black block text-xl font-bold">Nombre</label>
        <input
          type="text"
          placeholder="Aca va el nombre"
          className="border w-full p-3 mt-3 rounded-xl"
        />
      </div>
      <div className="my-10 mx-5">
        <label className="text-black block text-xl font-bold">Correo</label>
        <input
          type="email"
          placeholder="Aca va el correo"
          className="border w-full p-3 mt-3 rounded-xl"
        />
      </div>

      </div>
      
      </form>
  </>
  );
}

export default MyProfile;
