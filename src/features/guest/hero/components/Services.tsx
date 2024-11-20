import BuildingIcon from '@icons/linear/BuildingIcon'
import HeartIcon from '@icons/linear/HeartIcon'
import { services } from '@constants/landing.constants'
import CheckIcon from '@icons/linear/CheckIcon'
const Services = () => {
  return (
    <article className="max-w-[1920px] w-full flex items-center justify-between px-4 lg:px-12 xl:px-40 mt-12 ">
      <section className="hidden lg:flex w-full h-[32rem] items-center justify-center ">
        <div className="w-[20rem] h-[28rem] rounded-tl-3xl rounded-br-3xl bg-lime-50 relative">
          <div className="z-0 absolute -left-24 top-[50%] bg-white rounded-md shadow-md shadow-gray-200 p-4 ring-1 ring-gray-200 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 p-3">
              <HeartIcon className="w-full h-full fill-rose-500 " />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gray-700 font-bold text-sm ">Best Dental Care</p>
            </div>
          </div>
          <div className="z-30 absolute -right-12 top-24 bg-white rounded-md shadow-md shadow-gray-200 p-4 ring-1 ring-gray-200 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-green-50 p-2">
              <BuildingIcon className="w-full h-full stroke-1 stroke-green-500" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">No. 1 Dental Clinic in </p>
              <p className="text-gray-700 font-bold text-sm ">San Fernando Pampanga</p>
            </div>
          </div>


        </div>
      </section>
      <section className="w-full h-[32rem] flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center sm:items-start justify-center gap-2 max-w-[50ch] w-full">
          <p className="text-sm font-md text-lime-500 font-medium tracking-widest">SERVICES</p>
          <h1 className="text-4xl font-md text-green-950 font-bold text-center">High-Quality Treatments</h1>
        </div>
        <p className="mt-4 mb-6 text-base text-gray-500 text-start max-w-[50ch]">Welcome to our Clinic, where we specialize in delivering exceptional dental care with a focus on precision and patient comfort.</p>
        <p className="mb-6 text-base text-gray-500 text-start max-w-[50ch]"> Our dedicated team offers a comprehensive range of high-quality treatments designed to enhance oral health and restore confidence in every smile.</p>
        <ul className="text-base text-gray-700 flex flex-col gap-2 max-w-[50ch] w-full">
          {services.map((name, index)=>(
            <div className="flex items-center justify-start gap-2" key={index}>
              <figure className="w-4 h-4 rounded-full bg-lime-500 flex items-center justify-center">
                <CheckIcon className="stroke-white stroke-2 w-3 h-3" />
              </figure>
              <li className="text-gray-700 font-medium text-base">{name}</li>
            </div>
          ))}
        </ul>
      </section>

    </article>
  )
}

export default Services
