import { qualityPromises } from '@constants/landing.constants'
import ArrowIcon from '@icons/linear/ArrowIcon'

const QualityPromises = () => {
  return (
    <article className="max-w-[1920px] w-full flex flex-col items-center justify-between px-4 xl:px-40 gap-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm font-md text-lime-500 font-medium tracking-widest">QUALITY PROMISES</p>
        <h1 className="text-4xl font-md text-green-950 font-bold text-center">The Best Dental Experience</h1>
      </section>
      <section className="flex flex-wrap w-full gap-8 items-center justify-center md:px-4  ">
        {qualityPromises.map((promise, index) =>(
          <div className="w-[24rem] flex flex-col items-center justify-start ring-1 ring-gray-200 rounded-lg p-6" key={index}>
            <div className="w-full items-start justify-start">
              <div className={`w-11 h-11 rounded-md p-2 ${promise.color}`}>
                {promise.icon}
              </div>
              <h1 className="py-2 mt-4 w-full text-xl font-medium text-gray-700">{promise.title}</h1>
              <p className=" mt-1 text-gray-500">{promise.subtitle}</p>
              <div className="flex items-center justify-start mt-10 gap-2 font-medium">
                <p className="text-gray-700  ">Explore Now</p>
                <ArrowIcon className="stroke-2 stroke-green-950 w-4 h-4 -rotate-90" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </article>
  )
}

export default QualityPromises
