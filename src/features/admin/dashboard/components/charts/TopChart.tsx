import StarIcon from "@icons/linear/StarIcon"

const TopChart = () => {

  const data =[
    {
      name: "Wheat",
      quantity: 1104100,
    },
    {
      name: "Sugar Cane",
      quantity: 601140,
    },
    {
      name: "Bananas",
      quantity: 124141,
    },
    {
      name: "Apples",
      quantity: 45011
    },
    {
      name: "Grapes",
      quantity: 12011,
    },
    {
      name: "Mangoes",
      quantity: 9563,
    },
    {
      name: "Pineapples",
      quantity: 4213,
    },
  ]


  return (
    <section
      className="flex flex-col gap-5 w-full"
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4"
        >
          <StarIcon className="w-6 h-6 fill-yellow-500"/>
          <div className="flex items-center justify-between w-full">
            <h1 className="font-medium text-base">{item.name}</h1>
            <p className=" text-sm text-gray-500">{(item.quantity).toLocaleString('en-US')}</p>
          </div>
        </div>
      ))}
    
    </section>
  )
}

export default TopChart