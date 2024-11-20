import ArrowIcon from '@icons/linear/ArrowIcon copy 2'
import BuildingIcon from '@icons/linear/BuildingIcon'
import HeartIcon from '@icons/linear/HeartIcon'
import StarIcon from '@icons/linear/StarIcon'
import Dentist from '/dentist.webp'

const Hero = () => {
  return (
    <article className="max-w-[1920px] w-full flex items-center justify-center px-4 lg:px-12 xl:px-40 mt-28 ">
      <section className="w-full h-[32rem] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center lg:items-start justify-center">
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight text-green-950 text-center lg:text-start max-w-[28rem]">The Home of the
            <span className="text-lime-500 mx-2">Radiant Smiles</span>
          </h1>
          <p className="mt-4 mb-6 text-base text-gray-500 text-center lg:text-start max-w-[50ch]">Discover exceptional dental care with our wide range of top-quality services, delivered by our experienced team of qualified dentists.</p>
          <div className="gap-4 flex items-center justify-center lg:justify-start mt-4 w-full">
            <button className=" hover:bg-lime-400 active:bg-lime-600 transition-colors ease-in-out duration-300 text-white rounded-md px-4 py-2 bg-lime-500 font-medium text-sm shadow-lg shadow-lime-200">Chat with our AI </button>
            <button className=" rounded-md px-4 py-2 flex items-center ring-1 ring-green-950 justify-center gap-2">
              <p className="text-green-950 font-medium text-sm ">Contact Us</p>
              <ArrowIcon className="stroke-2 stroke-green-950 w-4 h-4 -rotate-90" />
            </button>
          </div>      
        </div>
      </section>
      <section className="hidden lg:flex w-full h-[30rem] items-center justify-center">
        <div className='h-full w-full overflow-clip rounded-3xl relative flex items-end justify-center '>            
          <img src={Dentist} alt="Dentist" className="z-30 w-[19rem] h-[33rem] object-cover absolute top-5" />
          <div className="w-[20rem] h-[24rem] rounded-3xl bg-lime-50 relative">
            <div className="z-40 absolute -left-16 top-[50%] bg-white rounded-md shadow-md shadow-gray-200 p-4 ring-1 ring-gray-200 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 p-3">
                <HeartIcon className="w-full h-full fill-rose-500 " />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-gray-700 font-bold text-sm ">Best Dental Care</p>
              </div>
            </div>
            <div className="z-20 absolute -right-20 top-4 bg-white rounded-md shadow-md shadow-gray-200 p-4 ring-1 ring-gray-200 flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-50 p-2">
                <BuildingIcon className="w-full h-full stroke-1 stroke-green-500" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500">No. 1 Dental Clinic in </p>
                <p className="text-gray-700 font-bold text-sm ">San Fernando Pampanga</p>
              </div>
            </div>
            <div className="z-40 absolute right-8 bottom-8 bg-white rounded-full shadow-md shadow-gray-200 p-2 ring-1 ring-gray-200 w-12 h-12 flex items-center justify-center">
              <StarIcon className="stroke-1 stroke-yellow-400 fill-yellow-400 w-full h-full" />
            </div>  
          </div>
        </div>
      </section>
    </article>
  )
}

export default Hero
