import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DentalRecordSchema } from "../schemas/appointment.schema";
import { DentalRecordType } from "../types/appointment.types";
import { useViewAppointmentStore } from "../stores/appointment.stores";
import { useMutation } from "@tanstack/react-query";
import { addDentalRecord } from "../services/patient.services";
import { useCalendarStore } from "../stores/calendar.stores";

const useAddDentalRecord = () => {
  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment);
  const setSelectedAppointment = useViewAppointmentStore((state) => state.setSelectedAppointment);
  const setViewActiveSheets = useViewAppointmentStore((state) => state.setViewActiveSheets);
  const setAppointments = useCalendarStore((state) => state.setAppointments);
  const appointments = useCalendarStore((state) => state.appointments);
  const setIsLoading = useViewAppointmentStore((state) => state.setIsLoading);
  
  const patient = selectedAppointment?.patientData || {};
  const record = selectedAppointment?.recordData || {}; 

  const oralData = record?.recordOralData || {};
  const hygieneData = record?.recordHygieneData || {};

  const methods = useForm<DentalRecordType>({
    resolver: zodResolver(DentalRecordSchema),
    mode: "onSubmit",
    defaultValues: {
      recordPatientId: patient._id || "",
      recordBloodPressure: {
        mm: record?.recordBloodPressure?.mm || 0,
        hg: record?.recordBloodPressure?.hg || 0,
      },
      recordSickness: record?.recordSickness || [],
      recordAllergies: record?.recordAllergies || [],
      recordOralData: {
        occlusi: oralData?.occlusi || "",
        torusPalatinus: oralData?.torusPalatinus || "",
        torusMandibularis: oralData?.torusMandibularis || "",
        palatum: oralData?.palatum || "",
        anomalousTeeth: oralData?.anomalousTeeth || "",
        other: oralData?.other || "",
      },
      recordHygieneData: {
        1: hygieneData[1] || "",
        2: hygieneData[2] || "",
        3: hygieneData[3] || "",
        4: hygieneData[4] || "",
        5: hygieneData[5] || "",
        6: hygieneData[6] || "",
        7: hygieneData[7] || "",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: DentalRecordType) => {
      setIsLoading(true);
      await addDentalRecord(data);
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.appointmentData._id === selectedAppointment.appointmentData._id) {
          return {
            ...appointment,
            recordData: data,
          };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
      setSelectedAppointment({
        ...selectedAppointment,
        recordData: data,
      });
    },
    onSuccess: () => {
      setViewActiveSheets((prev) => prev.filter((sheet) => sheet.name !== "ExtraSheet1"));
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<DentalRecordType> = async (data) => {
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useAddDentalRecord;
