
const Dentists = () => {
  const dentists = [
    {
      name: "Nina Roxanne Sandico",
      specialization: "General Dentistry",
    },
    {
      name: "Kien Andrew Dizon",
      specialization: "Orthodontist",
    },
    {
      name: "Candy Nicole Galang",
      specialization: "Periodontics",
    },
    {
      name: "Kristine Jewel Espiritu",
      specialization: "Maxillofacial Surgery",
    },
  ]
  return (
    <article className="max-w-[1920px] w-full flex flex-col items-center justify-between px-4 xl:px-40 gap-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm font-md text-lime-500 font-medium tracking-widest">DENTISTS</p>
        <h1 className="text-4xl font-md text-green-950 font-bold text-center">Meet Our Specialists</h1>
      </section>
      <section className="flex flex-wrap items-center justify-center md:px-4 gap-8">
        {dentists.map((dentist, index) =>(
          <div className="w-[16] flex flex-col items-center justify-start " key={index}>
            <figure className="rounded-3xl bg-lime-50 h-[20rem] w-[16rem] relative">
              
            </figure>
            <p className="text-base font-bold text-gray-700 mt-4">{"Dr. " + dentist.name} </p>
            <p className="text-sm text-gray-500">{dentist.specialization}</p>
          </div>
        ))}
      </section>
      
    </article>
  )
}

export default Dentists
