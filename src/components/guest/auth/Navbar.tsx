import Logo from "/logo.svg"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className="w-screen h-16 border-b mx-auto fixed top-0 z-50 bg-white/70 backdrop-blur-md flex items-center justify-center">
      <article className=" max-w-[1920px] w-full flex items-center justify-between h-16 px-4 lg:px-12 xl:px-40">
        <button onClick={()=>{navigate('/')}} className="flex items-center justify-start gap-2 w-auto lg:min-w-[16rem]">
          <div className="w-7 h-7 rounded-md">
            <img src={Logo} alt="VS Dental Logo" className="w-full h-full" />
          </div>
          <h1 className="text-2xl font-medium text-lime-500 break-keep tracking-wide">VS
            <span className="text-green-950 tracking-wide">Dental</span>
          </h1>
        </button>
        <section className="hidden md:flex items-center justify-center gap-2 w-auto">
          {/* <button className="px-4 text-gray-700 font-medium tracking-wide">Home</button>
          <button className="px-4 text-gray-500 font-medium tracking-wide">Services</button>
          <button className="px-4 text-gray-500 font-medium tracking-wide">Dentists</button>
          <button className="px-4 text-gray-500 font-medium tracking-wide">Reviews</button> */}
        </section>
        <section className="gap-4 flex items-center justify-end w-auto lg:min-w-[16rem]"> 
          <button onClick={()=>{navigate('/login')}} className=" text-green-950 rounded-md px-4 py-2 ring-1 ring-green-950 tracking-wide font-medium text-sm">Login</button>
          <button onClick={()=>{navigate('/signup')}} className=" text-white rounded-md px-4 py-2 bg-lime-500 font-base tracking-wide text-sm shadow-lg shadow-lime-200">Sign Up</button>
        </section>
      </article>
    </nav>
  )
}

export default Navbar

