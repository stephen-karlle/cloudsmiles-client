import { useViewAppointmentStore } from '../../stores/appointment.stores';
import CloseIcon from '@icons/linear/CloseIcon'
import ScheduledStep from '../steps/view_appointment/ScheduledStep';
import FinishedStep from '../steps/view_appointment/FinishedStep';
import { getAppointmentCheckup } from '../../services/calendar.services';
import { convertCheckups } from '../../utils/converter.utils';
import { useDrawerStore } from '@stores/drawer.store';
import { useQuery } from '@tanstack/react-query';



const ViewAppointmentForm = () => {
  const setViewDrawerOpen = useViewAppointmentStore((state) => state.setViewDrawerOpen)
  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment)
  const appointmentStatus = selectedAppointment.appointmentData.appointmentStatus || "Scheduled"
  const setIsLoading = useDrawerStore((state) => state.setIsLoading)

  const handleClose = () =>{
    setViewDrawerOpen(false)
  }

  const appointmentData = selectedAppointment.appointmentData

  
  const fetchCheckupData = async () => {
    setIsLoading(true);
    try {

      const response = await getAppointmentCheckup(selectedAppointment.appointmentData._id);
      const convertedCheckups = convertCheckups(response)

      console.log(convertedCheckups)

      return response.data ?? {};  // Return an empty object if no data is present

    } catch (error) {
      console.error("Error fetching checkup data:", error);
      return {};  // Return an empty object in case of error
    } finally {
      setIsLoading(false);
    }
  };

  useQuery({
    queryKey: ['appointmentPatientCheckupData'],
    queryFn: fetchCheckupData,
  });



  const isFinished = appointmentStatus === "Finished"
  const isViewOnly = isFinished

  return (
    <article className="flex flex-col w-full h-full">
      <section className="flex justify-between px-6 py-4 gap-2 border-b border-gray-200">
        <div className="flex-1 flex items-center justify-start gap-2 ">
          <label className="text-gray-500">Appointment ID</label>
          <h1 className="text-xl text-gray-700 font-medium">#{appointmentData?.appointmentSerialId}</h1>
          {/* <div className="w-1 h-1 rounded-full bg-gray-500" /> */}
          {/* <MonitorIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
          <label className="text-xs text-gray-500 tracking-wider">MANUAL APPOINTMENT</label> */}
        </div>
        {/* <button className="w-8 h-8 ring-1 ring-gray-200 rounded-md flex items-center justify-center" type="button">
          <EditIcon className="stroke-gray-500 stroke-2 w-4 h-4" />
        </button>
        <hr className="w-[1px] h-full bg-gray-200 ml-2" /> */}
        <button className="w-8 h-8" type="button" onClick={handleClose}>
          <CloseIcon className="stroke-1 stroke-gray-500 w-full h-full" />
        </button>
      </section>
      {isViewOnly ? (
        <FinishedStep />
      ) : (
        <ScheduledStep />
      )}

    </article>
  )
}

export default ViewAppointmentForm
