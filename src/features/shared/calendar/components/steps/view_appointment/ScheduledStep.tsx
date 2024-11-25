import { useState } from 'react';
import { usePaymentAppointmentStore, useViewAppointmentStore } from '@features/shared/calendar/stores/appointment.stores';
import { convertISOStringToFullDate, convertISOStringToShortDate, convertISOStringToTime } from '@utils/date.utils';
import { useUserStore } from '@stores/user.store';
import { getAppointmentCheckup, updateAppointmentStatus } from '@features/shared/calendar/services/calendar.services';
import { IUpdateStatusRequest } from '@features/shared/calendar/types/appointment.types';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { convertCheckups } from '@features/shared/calendar/utils/converter.utils';
import { createActivity } from '@features/admin/activities/services/activity.services';
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import FilePlusIcon from '@icons/linear/FilePlusIcon';
import ComboBox from '@components/ui/ComboBox';
import CalendarIcon from '@icons/linear/CalendarIcon';
import LockIcon from '@icons/linear/LockIcon';
import Button from '@components/ui/Button';
import ArrowIcon from '@icons/linear/ArrowIcon';
import ClockIcon from '@icons/linear/ClockIcon';
import InformationIcon from '@icons/linear/InformationIcon';
import AddPaymentForm from '../../forms/AddPaymentForm';
import DentalCheckupSheet from '../../sheets/DentalCheckupSheet';
import Avatar from '@components/ui/Avatar';
import NoteIcon from '@icons/linear/NoteIcon';
import DentalRecordSheet from '../../sheets/DentalRecordSheet';

const ViewStep = () => {
  const user = useUserStore((state) => state.user)
  const { setValue, watch } = useFormContext()
  const [isLoading, setIsLoading] = useState(true)
  const updateAppointments = useCalendarStore((state) => state.updateAppointments)
  const setViewDrawerOpen = useViewAppointmentStore((state) => state.setViewDrawerOpen)
  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment)

  const selectedAppointmentStatus = useViewAppointmentStore((state) => state.selectedAppointmentStatus)
  const setViewActiveSheets = useViewAppointmentStore((state) => state.setViewActiveSheets)

  const setPaymentMainSheet = usePaymentAppointmentStore((state) => state.setPaymentMainSheet)
  const setPaymentDrawerOpen = usePaymentAppointmentStore((state) => state.setPaymentDrawerOpen)
  const setSelectedAppointmentStatus = useViewAppointmentStore((state) => state.setSelectedAppointmentStatus)

  const appointmentData = selectedAppointment.appointmentData
  const patientData = selectedAppointment.patientData
  const dentistData = selectedAppointment.dentistData
  const credentialData = selectedAppointment.credentialData
  const checkupData = watch("checkupData")

  const fetchCheckupData = async () => {
    setIsLoading(true);
    try {

      const response = await getAppointmentCheckup(selectedAppointment.appointmentData._id);
      const convertedCheckups = convertCheckups(response);
  
      setValue("checkupPatientId", patientData._id);
      setValue("checkupData", convertedCheckups?.checkupData || {
        toothCheckup: [],
        sectionCheckup: [],
        generalCheckup: [],
      });

      setValue("agreementDocuments", convertedCheckups?.agreementDocuments ?? []);
  
      return response.data ?? {};  // Return an empty object if no data is present
    } catch (error) {
      console.error("Error fetching checkup data:", error);
      return {};  // Return an empty object in case of error
    } finally {
      setIsLoading(false);
    }
  };

  useQuery({
    queryKey: ['appointmentCheckupData'],
    queryFn: fetchCheckupData,
  });


  const statusMutation = useMutation({
    mutationFn: async (data: IUpdateStatusRequest) => {
      if (user.role === "assistant") {
        await createActivity({
          activityAssistantId: user._id,
          activityDescription: `Status for Appointment ${selectedAppointment.appointmentData.appointmentSerialId} has been edited.`,
          activityAction: "Update",
        })
      }
      setSelectedAppointmentStatus(data.appointmentStatus)
      const response = await updateAppointmentStatus(data);
      return response; 
    },
  });


  const isDoneDoingCheckup = [
    ...(checkupData.sectionCheckup || []),
    ...(checkupData.generalCheckup || []),
    ...(checkupData.toothCheckup || [])
  ].length > 0 

  const isViewOnly = selectedAppointmentStatus !== "Cancelled" 
  const isVerified = patientData?.patientStatus === "Verified"

  
  const handleOpenDentalCheckup = () => {
    setValue("checkupAppointmentId", selectedAppointment?.appointmentData._id)
    setValue("checkupPatientId", selectedAppointment?.patientData._id)
    setViewActiveSheets((prev) => 
      [
        ...prev,
        {
          name: "ExtraSheet1", 
          component: <DentalCheckupSheet />
        }, 
      ]
    )  
  }
  const handleOpenDentalRecord= () => {
    setValue("checkupPatientId", selectedAppointment?.patientData._id)
    setViewActiveSheets((prev) => 
      [
        ...prev,
        {
          name: "ExtraSheet1", 
          component: <DentalRecordSheet />
        }, 
      ]
    )  
  }

  const handleOpenAppointmentPayment = () => {
    setViewDrawerOpen(false);
    
    setTimeout(() => {
      setPaymentDrawerOpen(true);
      setPaymentMainSheet({
        name: "MainSheet",
        component: <AddPaymentForm />
      });
    }, 300);
  };
  const handleChangeStatus = (status: string) => {
    statusMutation.mutate({
      appointmentId: selectedAppointment?.appointmentData?._id || "", 
      appointmentStatus: status,
    })
    updateAppointments((prev) => {
      return prev.map((appointment) => {
        if(appointment.appointmentData._id === selectedAppointment?.appointmentData._id){
          return {
            ...appointment,
            appointmentData: {
              ...appointment.appointmentData,
              appointmentStatus: status
            }
          }
        }
        return appointment
      })
    })
  }
  

  return (
    <>
      <section className="flex flex-col h-full w-full items-center justify-start overflow-y-auto overflow-x-hidden ">
        <section className="w-full flex flex-col items-center justify-start px-6 gap-4 mb-2 ">
          <div className="w-full flex flex-col gap-2 mt-4">
            <label className="text-xs text-gray-500 tracking-wider">CHANGE STATUS</label>
            <ComboBox
              value={selectedAppointmentStatus ?? "Scheduled"}
              options={[
                "Scheduled",
                "Confirmed",
                "Cancelled",
              ]}
              setValue={(item)=> handleChangeStatus(item)}
              placeholder='status'
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-md w-full ring-1 ring-gray-200"> 
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-center gap-4 w-full p-4">
                <Avatar size='lg' name={patientData.patientFullName} src={patientData.patientAvatar} />
                <div className="flex flex-col w-full">
                  <label className="text-sm text-gray-500">Patient Name</label>
                  <h1 className="text-xl text-gray-700 font-medium">{patientData.patientFullName}</h1>
                </div>
              </div>
              <div className="w-40  flex items-center justify-center gap-2"> 
                {/* <div className={`w-2 h-2 rounded-full ${isVerified ? " bg-green-500 " : "bg-amber-500" } `} /> */}
                <label className={` text-gray-500 px-2 py-1 uppercase text-xs rounded-full ${isVerified ? " text-green-500 bg-green-50 " : " text-amber-500 bg-amber-50 "} `}>{patientData?.patientStatus}</label>
              </div>
            </div>
            <div className="h-fit border-t border-gray-200 w-full p-2 bg-gray-50 px-4 rounded-b-md ">
              <p className="text-sm text-gray-500 flex items-center justify-start">
                {appointmentData?.appointmentReasonForVisit}
              </p>
            </div>
          </div>
        </section>
        <section className="w-full grid grid-cols-[auto_30%_30%]  my-4  p-6 border-y border-gray-200">
          <div className="flex items-start justify-start gap-4 h-full w-full">
            <figure className="flex-shrink-0 w-8 h-8 rounded-full overflow-clip ring-1 ring-gray-200 bg-gray-100 flex items-center justify-center">
              <img src={dentistData?.dentistAvatar} alt="dentist" className="w-full h-full object-cover rounded-md" />
            </figure>
            <div className="flex flex-col itesm-start justify-center w-full">
              <label className="text-xs text-gray-500 tracking-wider">DENTIST</label>
              <label className="text-sm text-gray-700 font-medium">{dentistData.dentistFullName}</label>
            </div>
          </div>
          <div className="h-fit flex items-start justify-start gap-4">
            <figure className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
            </figure>
            <div className="flex flex-col itesm-start justify-center w-full">
              <label className="text-xs text-gray-500 tracking-wider">DATE</label>
              <label className="text-sm text-gray-700 font-medium">
                {convertISOStringToShortDate(appointmentData.appointmentDate.start)}
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
                {convertISOStringToTime(appointmentData.appointmentDate.start) + " - " + convertISOStringToTime(appointmentData.appointmentDate.end)}
              </label>
            </div>
          </div>
        </section>
        {/* <section className="border-y border-gray-200 w-full px-6 py-6 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-base text-gray-700 font-medium">#{paymentData?.paymentSerialId}</h1>
            <div className="text-xs text-rose-500 bg-rose-50 py-1 px-2 rounded-full uppercase">{paymentData?.paymentStatus}</div>
          </div>
          <button className="flex items-center justify-center gap-2 ring-1 ring-gray-200 rounded-md px-4 py-1 text-base text-gray-700" type="button">
            <BellRingingIcon className="stroke-2 stroke-yellow-500 w-5 h-5" />
            Send Reminder
          </button>
        </section> */}
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
      </section>
      {isViewOnly && (
        <section className="py-4 px-6 border-t border-gray-200 flex flex-col w-full gap-2">
          <div className="h-12 flex items-center justify-end gap-4 w-full">
            <button
              className="hover:bg-lime-50 transition-all duration-300 ease-in-out w-full flex items-center justify-center gap-2 rounded-md outline-dashed outline-1 h-9 text-lime-500 text-sm" 
              type="button"
              onClick={handleOpenDentalRecord}
            >            
              <NoteIcon className="stroke-2 stroke-lime-500 h-4 w-4" />
              Edit Dental Record
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 rounded-md border- bg-green-500 hover:bg-green-400 active:bg-green-600 h-9 text-white text-sm" 
              type="button"
              onClick={handleOpenDentalCheckup}
              >            
              <FilePlusIcon className="stroke-2 stroke-white h-4 w-4 " />
              {isDoneDoingCheckup ? "Edit" : "Add"} Dental Checkup
            </button>
          </div>
          <div className="h-12 flex items-center justify-end gap-4 w-full">
            <Button
              className="group w-full flex items-center justify-center hover:animate-[width] duration-300 ease-in-out" 
              type="button"
              variant={isDoneDoingCheckup ? "primary" : "disabled"}
              disabled={(!isDoneDoingCheckup && isLoading) }
              onClick={handleOpenAppointmentPayment}
            >            
              <div className=" flex items-center justify-center transition-all duration-300 group ">
                {(!isDoneDoingCheckup && isLoading) && <LockIcon className="stroke-2 stroke-white h-5 w-5 mr-1" /> }
                <p className="w-full text-center text-sm">Proceed to Payment</p>
                {isDoneDoingCheckup && 
                  <ArrowIcon className="stroke-2 stroke-white h-6 -rotate-90 transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 group-hover:w-6" />
                }
              </div>
            </Button>
          </div>
          <div className="w-full flex items-center justify-center gap-2">
            <InformationIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
            <label className="text-gray-500 text-sm">Please Add Dental Checkup to finish the appointment</label>
          </div>
        </section>
      )}
    </>
  )
}

export default ViewStep
