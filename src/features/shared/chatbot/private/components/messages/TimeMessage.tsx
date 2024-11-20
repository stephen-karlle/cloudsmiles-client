import { useQuery } from '@tanstack/react-query';
import { getDentistTimeAvailability, updateChainData } from '../../services/chatbot.services';
import { useState } from 'react';
import { convertMilitaryTime } from '@features/shared/calendar/utils/converter.utils';
import { useUserStore } from '@stores/user.store';
import Button from '@components/ui/Button';
import { ITimeSlot } from '@features/shared/calendar/types/store.types';

interface ITimeMessage {
  handleSendMessage: ( prompt: string) => void;
}

const TimeMessage = ({ handleSendMessage }: ITimeMessage) => {

  const [ selectedTime , setSelectedTime ] = useState<string | null>(null)

  const user = useUserStore((state) => state.user)
  const patientId = user._id

  const { data: timeSlots, isLoading } = useQuery<ITimeSlot[]>({
    queryKey: ["dentistTimeAvailability"],
    queryFn: async () => {
      const res = await getDentistTimeAvailability(patientId)
      return res.timeSlots
    },
  })
  
  if (isLoading && !timeSlots) return <div>Loading...</div>

  if (!timeSlots) return <div>No time slots available</div>


  const morningEnd = "12:00";
  const noonStart = "12:00";
  const noonEnd = "13:00";
  const afternoonStart = "13:00";
  
  const morningTimeSlots = timeSlots.filter(slot => slot.time < morningEnd);
  const noonTimeSlots = timeSlots.filter(slot => slot.time >= noonStart && slot.time < noonEnd);
  const afternoonTimeSlots = timeSlots.filter(slot => slot.time >= afternoonStart);


  const handleSubmit = async () =>{
    const time = selectedTime?.slice(0, 5)
    await updateChainData({
      appointmentTime: time,
      patientId: patientId,
    })

    const formattedTime = time ? convertMilitaryTime(time) : ""

    const prompt = `I would like to book an appointment at ${formattedTime}`
    handleSendMessage(prompt)
  }



  return (
    <article className="border-t border-gray-200 px-2 py-4 mt-4 flex flex-col gap-4">
      {morningTimeSlots.length > 0 && (
        <div className="flex flex-col">
          <h1 className="text-lg font-medium text-gray-700">Morning</h1>
          <div className="flex flex-wrap gap-4 w-full mt-3">
            {morningTimeSlots.length > 0 && morningTimeSlots.map((timeSlot, index) => {
              const isSelected = selectedTime === timeSlot.time;
              return (
                <Button 
                  key={index}
                  onClick={() => setSelectedTime(timeSlot.time)} 
                  className="flex-grow w-24 p-2 text-sm" 
                  variant={isSelected ? "primary" : "secondary"}
                >
                  {convertMilitaryTime(timeSlot.time.slice(0, 5))}
                </Button>
              )}
              )
            }
          </div>
        </div>
      )}
      {noonTimeSlots.length > 0 && (
        <div className="flex flex-col">
          <h1 className="text-lg font-medium text-gray-700">Noon</h1>
          <div className="flex flex-wrap gap-4 w-full mt-3">
            { noonTimeSlots.map((timeSlot, index) => {
              const isSelected = selectedTime === timeSlot.time;
              return (
                <Button 
                  key={index}
                  onClick={() => setSelectedTime(timeSlot.time)} 
                  className="flex-grow w-24 p-2 text-sm" 
                  variant={isSelected ? "primary" : "secondary"}
                >
                  {convertMilitaryTime(timeSlot.time.slice(0, 5))}
                </Button>
              )}
              )
            }
          </div>
        </div>
      )}
      {afternoonTimeSlots.length > 0 && (
        <div className="flex flex-col">
          <h1 className="text-lg font-medium text-gray-700">Afternoon</h1>
          <div className="flex flex-wrap gap-4 w-full mt-3">
            { afternoonTimeSlots.map((timeSlot, index) => {
              const isSelected = selectedTime === timeSlot.time;
              return (
                <Button 
                  key={index}
                  onClick={() => setSelectedTime(timeSlot.time)} 
                  className="flex-grow w-24 p-2 text-sm" 
                  variant={isSelected ? "primary" : "secondary"}
                >
                  {convertMilitaryTime(timeSlot.time.slice(0, 5))}
                </Button>
              )}
              )
            }
          </div>
        </div>
      )}
      <Button 
        className="w-full mt-4"
        onClick={handleSubmit}
        variant={selectedTime ? "primary" : "disabled"}
        disabled={!selectedTime}
      >
        Select Time
      </Button>    
    </article>
  )
}

export default TimeMessage