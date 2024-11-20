import StarIcon from "@icons/linear/StarIcon"

const Reviews = () => {

  const reviews =  [
    {
      name: "Sebastian Pineda",
      date: "Sep 2nd 2023",
      text: "This is highly recommended dental clinic here in pampanga #TheBest!!!"
    },
    {
      name: "Charmaine MA",
      date: "Jun 10th 2020",
      text: "Good service and sobrang bait ni Doc"
    },
    {
      name: "Kristin Lalu Jiminez",
      date: "Feb 9th 2020",
      text: "They provide quality service. Super bait ni Doctora"
    },
    {
      name: "ML Guinevere",
      date: "June 9th 2020",
      text: "Bait ni doctora! very good service. hindi basta basta or namemera. thanks doc!! no more pain"
    },
    {
      name: "Marie Elissa Basilio",
      date: "May 3rd 2020",
      text: "High recommended! very accomodating to their patients and other customers! Good Quality Services. love this clinic"
    },
    {
      name: "Lhyn Mallari Carreon",
      date: "Feb 2th 2020",
      text: "High recommended!!!! Best Dentist and the staff is very accomodating"
    },
  ]


  return (
    <article className="max-w-[1920px] w-full flex flex-col items-center justify-between px-4 xl:px-40 gap-8 mt-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm font-md text-lime-500 font-medium tracking-widest">REVIEWS</p>
        <h1 className="text-4xl font-md text-green-950 font-bold text-center">1000+ Brighter Smiles and Counting.</h1>
      </section>
      <section className="relative w-[80%] overflow-hidden ">
        <div className="absolute inset-0 z-20 before:absolute before:left-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:filter before:blur-1 after:absolute after:right-0 after:top-0  after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:filter after:blur-1"></div>
        <div className="flex gap-6 py-2 animate-loop-scroll">
          {[...reviews, ...reviews].map((slide, index)=>(
            <div className="ring-1 rounded-md ring-gray-200 p-6 flex-shrink-0 w-[24rem]" key={index}>
              <div className="flex items-center justify-between">
                <p className="text-xl text-gray-500">"</p>
                <div className="flex items-center justify-center">
                  <StarIcon  className="fill-yellow-500 stroke-1 stroke-yellow-500 w-5 h-5" />
                  <StarIcon  className="fill-yellow-500 stroke-1 stroke-yellow-500 w-5 h-5" />
                  <StarIcon  className="fill-yellow-500 stroke-1 stroke-yellow-500 w-5 h-5" />
                  <StarIcon  className="fill-yellow-500 stroke-1 stroke-yellow-500 w-5 h-5" />
                  <StarIcon  className="fill-gray-200 stroke-1 stroke-gray-200 w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 mb-6 text-base text-gray-500 text-center lg:text-start max-w-[50ch] whitespace-pre-line [overflow-wrap:anywhere]">{slide.text}</p>
              <div className="flex items-center justify-start gap-2">
                <figure className="w-8 h-8 rounded-full bg-purple-700 text-white">

                </figure>
                <div className=" flex flex-col items-start justify-start ">
                  <p className="text-base font-bold text-gray-700 ">{slide.name}</p>
                  <p className="text-sm text-gray-500">{slide.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

export default Reviews
