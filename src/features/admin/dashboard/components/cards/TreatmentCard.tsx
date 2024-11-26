import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getTopTreatments } from '../../services/dashboard.services';
import StarIcon from '@icons/linear/StarIcon'

type TreatmentDashboardType = {
  reviews: number;
  name: string;
}

const TreatmentCard = () => {


  const { data: treatments, isLoading} = useQuery<TreatmentDashboardType[]>(
    {
      queryKey: ['treatmentDashboardData'],
      queryFn: getTopTreatments,
    },
  );



  return (
    <div className="w-full h-full flex-col gap-2 items-center bg-white ring-1 rounded-md ring-gray-200 flex justify-start p-4 ">
      <div className="flex justify-between items-center w-full gap-4">
        <h1 className="text-lg font-medium text-gray-700">Popular Treatments</h1>
        <Link to="/treatment" className="text-sm text-gray-500 underline underline-offset-2">View all</Link>
      </div>
      {(!isLoading && treatments )&& treatments.map((treatment, index) => (
        <div key={index} className="flex items-center w-full justify-between h-7 ">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-md bg-amber-500" />
            <h1 className="text-sm font-normal text-gray-700 ">{treatment.name}</h1>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 stroke-amber-500 fill-amber-500" />
            <h1 className="text-sm font-medium text-gray-700">{(treatment.reviews).toFixed(1)}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TreatmentCard
