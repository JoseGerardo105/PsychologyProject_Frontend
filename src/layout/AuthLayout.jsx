import { Outlet } from 'react-router-dom'

const styles = {
    fontFamily: 'Oleo Script'
};

const AuthLayout = () => {
  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
    <link href="https://fonts.googleapis.com/css2?family=Oleo+Script&family=Sofia+Sans:ital,wght@1,100&display=swap" rel="stylesheet"></link>
    <main className="container mx-8 my-8 md:grid grid-cols-2 gap-96">
        <div className='text-slate-950 font-black text-7xl'>
            <h1 style={styles}>
                <span className='text-indigo-900'>Psy</span>nergia
            </h1>
            <br />
            <br />
            <br />
            <h1 className='align-middle font-normal'>
            Tus citas, <br />tus pacientes, <br /> <span className='text-indigo-700 '>De una manera <br /> rapida y sencilla.</span>
            </h1>
        </div>
        <Outlet/> 

    </main>

    </>
  )
}

export default AuthLayout