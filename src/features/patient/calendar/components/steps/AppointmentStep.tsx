import { convertISOStringToFullDate, convertISOStringToShortDate, convertISOStringToTime } from "@utils/date.utils"
import { usePatientStore } from "../../stores/patient.store"
import { AgreementResponseType } from "../../types/patient.types"
import CalendarIcon from "@icons/linear/CalendarIcon"
import ClockIcon from "@icons/linear/ClockIcon"
import FileCard from "../cards/FileCard"



type AppointmentStepType = {
  agreementDocuments: AgreementResponseType[] | null
}

const AppointmentStep = ({
  agreementDocuments,
}: AppointmentStepType) => {

  const selectedAppointment = usePatientStore((state) => state.selectedAppointment)
  const appointmentData = selectedAppointment.appointmentData
  const patientData = selectedAppointment.patientData
  const dentistData = selectedAppointment.dentistData
  const credentialData = selectedAppointment.credentialData

    

  return (
    <section className="flex flex-col h-full w-full items-center justify-start overflow-y-auto overflow-x-hidden pt-6">

      <section className="w-full grid grid-cols-[auto_30%_30%]  mb-4  p-6 border-y border-gray-200">
        <div className="flex items-start justify-start gap-4 h-full w-full">
          <figure className="flex-shrink-0 w-8 h-8 rounded-full overflow-clip ring-1 ring-gray-200 bg-gray-100 flex items-center justify-center">
            <img src={dentistData?.dentistAvatar} alt="dentist" className="w-full h-full object-cover rounded-md" />
          </figure>
          <div className="flex flex-col itesm-start justify-center w-full">
            <label className="text-xs text-gray-500 tracking-wider">DENTIST</label>
            <label className="text-sm text-gray-700 font-medium">{dentistData?.dentistFullName}</label>
          </div>
        </div>
        <div className="h-fit flex items-start justify-start gap-4">
          <figure className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
          </figure>
          <div className="flex flex-col itesm-start justify-center w-full">
            <label className="text-xs text-gray-500 tracking-wider">DATE</label>
            <label className="text-sm text-gray-700 font-medium">
              {convertISOStringToShortDate(appointmentData?.appointmentDate?.start ?? "")}
            </label>                

          </div>
        </div>
        <div className="h-fit flex items-start justify-start gap-4">
          <figure className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
            <ClockIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
          </figure>
          <div className="flex flex-col itesm-start justify-center w-full">
            <label className="text-xs text-gray-500 tracking-wider">TIME</label>
            <label className="text-sm text-gray-700 font-medium">
              {convertISOStringToTime(appointmentData.appointmentDate.start) + " - " + convertISOStringToTime(appointmentData.appointmentDate.end )}
            </label>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 w-full px-6 ">
        <h1 className="text-base font-medium text-gray-700">General Information</h1>
        <div className="flex w-full items-start justify-center">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs tracking-wider text-gray-500">FULL NAME</label>
            <h1 className="text-sm text-gray-700 font-medium">{patientData.patientFullName}</h1>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs tracking-wider text-gray-500">PHONE NUMBER</label>
            <h1 className="text-sm text-gray-700 font-medium">(+63){credentialData.credentialPhoneNumber}</h1>
          </div>
        </div>
        <div className="flex w-full items-start justify-center">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs tracking-wider text-gray-500">DATE OF BIRTH</label>
            <h1 className="text-sm text-gray-700 font-medium">{convertISOStringToFullDate(patientData.patientDateOfBirth)}</h1>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs tracking-wider text-gray-500">EMAIL ADDRESS</label>
            <h1 className="text-sm text-gray-700 font-medium break-all">{credentialData.credentialEmail}</h1>
          </div>
        </div>
        <div className="flex w-full items-start justify-center">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs tracking-wider text-gray-500">GENDER</label>
            <h1 className="text-sm text-gray-700 font-medium">{patientData.patientGender}</h1>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs tracking-wider text-gray-500">ADDRESS</label>
            <h1 className="text-sm text-gray-700 font-medium">{patientData.patientAddress}</h1>
          </div>
        </div>
      </section>
      {agreementDocuments && agreementDocuments.length > 0 && (
        <section className="w-full flex flex-col justify-start p-6 mt-2">
          <h1 className="text-base font-medium text-gray-700">Agreement Documents</h1>
          <div className="w-full flex flex-col justify-start mt-4 gap-4">
            {agreementDocuments.map(( document, index) => {
              return (
                <FileCard 
                  key={index} 
                  file={document} 
                />
              )
            })}
          </div>
        </section>
      )}
    </section>
  )
}

export default AppointmentStep