import { useQuery } from '@tanstack/react-query';
import { getDentists, updateChainData } from '../../services/chatbot.services';
import { IDentistResponse } from '@features/admin/staff/types/dentists.types';
import { useState } from 'react';
import Button from '@components/ui/Button';
import { useUserStore } from '@stores/user.store';

interface IDentistMessage {
  handleSendMessage: ( prompt: string) => void;
}

const DentistMessage = ({ handleSendMessage }: IDentistMessage) => {

  const user = useUserStore((state) => state.user)
  const patientId = user._id

  const [ selectedDentist , setSelectedDentist ] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["chatbotDentistsData"],
    queryFn: async () => {
      const dentists =  await getDentists()
      return dentists ? dentists.map((dentist) => dentist) as IDentistResponse[] : []
    },
  })

  
  if (isLoading) return <div>Loading...</div>


  
  const handleSubmit = async () =>{
    await updateChainData({
      appointmentDentistId: selectedDentist,
      patientId: patientId,
    })
    const dentistFullName = data?.find((dentist) => dentist._id === selectedDentist)?.dentistFullName
    const prompt = `I would like to choose Dr. ${dentistFullName} as my dentist.`;    
    handleSendMessage(prompt)
  }



  return (
    <article className="border-t border-gray-200 p-4 pt-6 mt-4 flex flex-col gap-4">
      {data && data.map((dentist, index) => {
        const isSelected = selectedDentist === dentist?._id
        return (          
          <button 
            className={`w-full overflow-hidden p-4 flex flex-col  left-0 ring-1 rounded-md transition-all ease-out duration-300
                ${isSelected ? "bg-lime-50 ring-lime-500   " : "bg-white  ring-gray-200 hover:bg-gray-50"}
              `}
            onClick={() => setSelectedDentist(dentist._id)}
            key={index}
          >
            <div className="flex items-center justify-start gap-4">
              <div className="w-9 h-9 rounded-full flex-shrink-0 ring-1 ring-gray-200">
                <img src={dentist.dentistAvatar} alt={dentist.dentistFullName} className="w-full h-full rounded-full" />
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="text-gray-700 text-md ">{dentist.dentistFullName}</h1>
                <p className="text-gray-500 text-sm">{dentist.dentistSpecialization}</p>
              </div>
            </div>
          </button>
        )}
      )}
      <Button 
        className="w-full"
        onClick={handleSubmit}
        variant={selectedDentist ? "primary" : "disabled"}
        disabled={!selectedDentist}
      >
        Select Dentist
      </Button>
    </article>
  )
}

export default DentistMessage