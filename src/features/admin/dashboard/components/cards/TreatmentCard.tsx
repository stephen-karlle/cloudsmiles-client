import { Link } from 'react-router-dom'
import StarIcon from '@icons/linear/StarIcon'

const TreatmentCard = () => {
  const treatments = [
    {
      name: "Deep Cleaning",
      reviews: 4.8,
    },
    {
      name: "Tooth Extraction",
      reviews: 4.7,
    },
    {
      name: "Dental Implant",
      reviews: 4.5,
    },
  ]
  return (
    <div className="w-full h-full flex-col gap-2 items-center bg-white ring-1 rounded-md ring-gray-200 flex justify-start p-4 ">
      <div className="flex justify-between items-center w-full gap-4">
        <h1 className="text-lg font-medium text-gray-700">Popular Treatments</h1>
        <Link to="/treatment" className="text-sm text-gray-500 underline underline-offset-2">View all</Link>
      </div>
      {treatments.map((treatment, index) => (
        <div key={index} className="flex items-center w-full justify-between h-7 ">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-md bg-amber-500" />
            <h1 className="text-sm font-normal text-gray-700 ">{treatment.name}</h1>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 stroke-amber-500 fill-amber-500" />
            <h1 className="text-sm font-medium text-gray-700">{treatment.reviews}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TreatmentCard