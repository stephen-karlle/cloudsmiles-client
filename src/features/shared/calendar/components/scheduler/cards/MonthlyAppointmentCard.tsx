import { IAppointmentResponse } from "@features/shared/calendar/types/appointment.types"
import { MouseEvent, useRef, useState } from "react"
import { removeDateOffset } from "@features/shared/calendar/utils/calendar.utils"
import { useViewAppointmentStore } from "@features/shared/calendar/stores/appointment.stores"
import Avatar from "@components/ui/Avatar"
import PopOver from "@components/ui/PopOver"
import ChevronIcon from "@icons/linear/ChevronIcon"
import ClockIcon from "@icons/linear/ClockIcon"
import SearchIcon from "@icons/linear/SearchIcon"
import ViewAppointmentForm from "../../forms/ViewAppointmentForm"

type MonthlyAppointmentCardProps = {
  appointments: IAppointmentResponse[]
}

const MonthlyAppointmentCard = ({appointments }:MonthlyAppointmentCardProps ) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [ searchValue, setSearchValue ] = useState<string>("")
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const setSelectedAppointment = useViewAppointmentStore((state) => state.setSelectedAppointment);
  const setViewDrawerOpen = useViewAppointmentStore((state) => state.setViewDrawerOpen);
  const setViewMainSheet = useViewAppointmentStore((state) => state.setViewMainSheet);
  const setSelectedAppointmentStatus = useViewAppointmentStore((state) => state.setSelectedAppointmentStatus);

  const filteredAppointments = appointments.filter((appointment) => {
    const patient = appointment.patientData
    const patientName = patient.patientFullName.toLowerCase()
    return patientName.includes(searchValue.toLowerCase())
  })

  const handleOpen = (e: MouseEvent, appointment: IAppointmentResponse) => {
    setIsOpen(false)
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setViewDrawerOpen(true);
    setSelectedAppointmentStatus(appointment.appointmentData.appointmentStatus);
    setViewMainSheet({name: "MainSheet", component: <ViewAppointmentForm />})
  }

  const formatTime = (time: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(time);
  };
  
  return (
    <button 
      ref={anchorRef} 
      className="absolute top-0 left-0 w-10 h-10 flex items-center justify-center p-1 "
      onClick={() => setIsOpen(!isOpen)}
    >
      <ChevronIcon className={`w-4 h-4 stroke-gray-500 stroke-[3px]
          ${isOpen ? `rotate-0` : ' -rotate-90 ' }
          transition-transform duration-300 ease-in-out
        `}/>
      <div className="relative">
        <PopOver 
          position="center-bottom" 
          anchorRef={anchorRef} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          className="w-60 "
        >
          <div className="w-full h-full flex flex-col bg-white ">
            <div className="flex items-center gap-1 px-4 py-2 ">
              <SearchIcon className="w-4 h-4 stroke-2 stroke-gray-500"/>
              <input 
                onClick={(e) => e.stopPropagation()}
                type="text" 
                placeholder="Search appointment" 
                className="w-full h-8 text-sm text-gray-700 rounded-md px-2 outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div
              className="w-full flex flex-col overflow-y-auto overflow-x-hidden max-h-40"
            >
              {filteredAppointments.map((appointment, index) => {
                const patient = appointment.patientData
                const appointmentDate = appointment.appointmentData.appointmentDate
                const startTime = new Date(removeDateOffset(appointmentDate.start))
                const endTime = new Date(removeDateOffset(appointmentDate.end))
                const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`

                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between w-full py-2 px-4 gap-2 border-t hover:bg-gray-50 transition-colors duration-300 ease-in-out"
                    onClick={(e) => handleOpen(e, appointment)}
                  >
                    <Avatar size="xs" name={patient.patientFullName} src={patient.patientAvatar} />
                    <div className="flex flex-col items-start justify-center w-full">
                      <label className="text-sm text-start text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{patient.patientFullName}</label>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3 stroke-2 stroke-gray-500"/>
                        <label className="text-xs text-start text-gray-500 font-light whitespace-nowrap overflow-hidden text-ellipsis">{timeRange}</label>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </PopOver>
      </div>
    </button>  
  )
}

export default MonthlyAppointmentCard