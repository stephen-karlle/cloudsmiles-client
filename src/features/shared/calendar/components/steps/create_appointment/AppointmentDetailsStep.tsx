import { findPatients } from '@features/shared/calendar/services/patient.services'
import { useNewAppointmentStore } from '@features/shared/calendar/stores/appointment.stores'
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores'
import { 
  calculateNumberOfAvailableTimeSlots, 
  calculateNumberOfDentistAppointments, 
  formatDate, 
  getStartTime 
} from '@features/shared/calendar/utils/calendar.utils'
import { debounce } from '@utils/debounce'
import { useCallback, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Avatar from '@components/ui/Avatar'
import ErrorMessage from '@components/ui/ErrorMessage'
import Label from '@components/ui/Label'
import SearchInput from '@components/ui/SearchInput'
import TextArea from '@components/ui/TextArea'
import TimeRangePicker from '@components/ui/TimeRangePicker'
import CloseIcon from '@icons/linear/CloseIcon'
import { PatientResponseType } from '@features/shared/patients/types/patient.types'



const AppointmentDetailsStep = () => {

  const [patientQuery, setPatientQuery] = useState<string>("")
  const [patientList, setPatientList] = useState<PatientResponseType[]>([])

  const { control, clearErrors, formState: {errors}, watch, setValue} = useFormContext()
  const appointments = useCalendarStore((state) => state.appointments)
  const weekDate = useCalendarStore((state) => state.selectedDate)
  const dayDate = useCalendarStore((state) => state.date)
  const activeView = useCalendarStore((state) => state.activeView)
  const selectedTimeIndex = useNewAppointmentStore((state) => state.selectedTimeIndex)
  const selectedDentist = useNewAppointmentStore((state) => state.selectedDentist)
  
  const timeSlots = useCalendarStore((state) => state.timeSlots)
  const openingTime = useCalendarStore((state) => state.openingTime)
  const closingTime = useCalendarStore((state) => state.closingTime)

  
  const date = activeView === "Day" ? dayDate : weekDate
  const appointmentCount = calculateNumberOfDentistAppointments(selectedDentist, appointments, date)
  const dayDentistTimeSlots = timeSlots.filter(slot => slot.id === selectedDentist._id)
  
  const weekDentistTimeSlots = timeSlots.filter(
    slot => slot.id === selectedDentist._id 
  ); 
  
  const dentistTimeSlots = activeView === "Day" ? dayDentistTimeSlots : weekDentistTimeSlots
  const startTime = getStartTime(selectedTimeIndex, openingTime, closingTime, date)

  const timeRange = calculateNumberOfAvailableTimeSlots(
    dentistTimeSlots, 
    startTime, 
    openingTime, 
    closingTime,
    selectedDentist._id,
    date,
  )


  const appointmentErrors = errors.appointmentData as any 
  const patientErrors = errors.patientData as any
  const patientData = watch("patientData")


  const handleChange = useCallback(
    debounce(async (value: string) => {
      if (value.length === 0) return; 
      const patients = await findPatients(value);
      setPatientList(patients);
    }, 500),
    [patientData] 
  )
  

  const handlePatientSelect = (patient: PatientResponseType) => {
    clearErrors("patientData.patientId")
    setValue("patientData.patientId", patient._id)
    setValue("patientData.patientFullName", patient.patientFullName)
    setValue("patientData.patientAddress", patient.patientAddress)
    setValue("patientData.patientAvatar", patient.patientAvatar)
    setPatientQuery(patient.patientFullName)
    setPatientList([])
  }

  const handleResetPatient = () => {
    setValue("patientData.patientId", "")
    setValue("patientData.patientFullName", "")
    setValue("patientData.patientAddress", "")
    setValue("patientData.patientAvatar", "")
    setPatientQuery("")
    setPatientList([])
  }



  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll px-6 py-4 overflow-x-hidden outline-none ">
      <Label className=" mb-2">Patient</Label>
      {patientData.patientId ? (
        <div className="flex items-center justify-between w-full h-10 rounded-full ">
          <div className="flex gap-2 items-center">
            <Avatar 
              className=""
              size='xs'
              src={patientData.patientAvatar}
              name={patientData.patientFullName}
            />
            <div className="flex flex-col w-full items-start justify-center">
              <span className="text-sm text-gray-700">{patientData.patientFullName}</span>
              <span className="text-xs text-gray-500">{patientData.patientAddress}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetPatient}
          >
            <CloseIcon className="w-6 h-6 stroke-2 stroke-rose-500" />
          </button>
        </div>
      ) : (
        <SearchInput
          type="text"
          className="h-10 w-full flex-shrink-0" 
          placeholder="Juan Dela Croax"
          value={patientQuery}
          onChange={(e) => {
            const query = e.target.value;
            setPatientQuery(query);
            if (query.length === 0) {
              setPatientList([]);
            } else {
              handleChange(query); 
            }
          }}
          didError={!!patientErrors?.patientId}
          isOpen={patientQuery.length > 0 && patientList.length > 0}
        >
          {patientList.map((patient, index) => (
            <button key={index} 
              type="button" 
              className="flex items-center justify-start cursor-pointer rounded-md gap-4"
              onClick={()=>handlePatientSelect(patient)}
            >
              <Avatar 
                className=""
                src={patient.patientAvatar}
                name={patient.patientFullName}
              />
              <div className="flex flex-col w-full items-start justify-center">
                <span className="text-sm text-gray-700">{patient.patientFullName}</span>
                <span className="text-xs text-gray-500">#{patient.patientSerialId}</span>
              </div>
            </button>
          ))}
        </SearchInput>
      )}
      <ErrorMessage message={patientErrors?.patientId?.message} />

      <Label className=" mt-6">Dentist</Label>
      <div className="mt-2 flex items-center justify-start rounded-md ring-1 ring-gray-200 px-4 py-2 gap-4">
        <figure className="w-10 h-10 rounded-full">
          <img src={selectedDentist?.dentistAvatar} alt="Dentist Avatar" className="rounded-full object-cover w-full h-full" />
        </figure>
        <div className="flex flex-col">
          <label className="text-base text-gray-700">{"Dr. " + selectedDentist?.dentistFullName}</label>
          <label className="text-sm flex items-center gap-1">
            <span className="text-gray-500 text-sm">Today's appointment: </span>
            <span className="text-gray-700">{appointmentCount}{appointmentCount >= 0 ? " patient": " patients"}</span>
          </label>
        </div>
      </div>
      <Label className=" mt-6">Date & Time</Label>
      <div className="mt-2 flex items-center justify-start gap-4 ">
        <div className="flex gap-4 flex-shrink-0">
          <hr className="bg-lime-500 w-[2px] h-6 rounded-full" />
          <h1 className="text-base text-gray-700 font-medium">{formatDate(date)}</h1>
        </div>
        <Controller 
          name="appointmentData.appointmentTime"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TimeRangePicker 
              closingTime={timeRange.end} 
              openingTime={timeRange.start}
              value={{ start: value?.start ?? "", end: value?.end ?? "" }} 
              onChange={(newValue) => {
                onChange({
                  start: newValue.start ?? value.start,
                  end: newValue.end ?? value.end
                });
                clearErrors("appointmentData.appointmentTime")
              }}
              didError={!!appointmentErrors?.appointmentTime}
            />
          )}
        />
      </div>
      <ErrorMessage message={appointmentErrors?.appointmentTime?.end?.message} />
      <Label className="mt-2">Reason for visit</Label>
      <Controller 
        name="appointmentData.appointmentReasonForVisit"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextArea
            placeholder="Type the patient's concern"
            onChange={(e) => {
              onChange(e.target.value)
              clearErrors("appointmentData.appointmentReasonForVisit")
            }}
            value={value}
            className="mt-2"
            didError={!!appointmentErrors?.appointmentReasonForVisit}
          />
        )}
      />
      <ErrorMessage message={appointmentErrors?.appointmentReasonForVisit?.message} />

    </section>
  )
}

export default AppointmentDetailsStep
