import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils";
import { cancelAppointment, getBills } from "../../services/patient.services";
import { DentalCheckupResponseType } from "@features/shared/calendar/types/appointment.types";
import { convertPatientCheckups } from "@features/shared/calendar/utils/converter.utils";
import { getAppointmentCheckup } from "@features/shared/calendar/services/calendar.services";
import { getTreatmentCost } from "@features/shared/calendar/services/treatment.services";
import { usePatientStore } from "../../stores/patient.store";
import { useDrawerStore } from "@stores/drawer.store";
import { toast } from "sonner";
import CloseIcon from "@icons/linear/CloseIcon";
import AppointmentStep from "../steps/AppointmentStep";
import Stepper from "@components/ui/Stepper";
import CalendarIcon from "@icons/linear/CalendarIcon";
import Document1Icon from "@icons/linear/Document1Icon";
import MoneyIcon from "@icons/linear/MoneyIcon";
import CheckupStep from "../steps/CheckupStep";
import Button from "@components/ui/Button";
import PaymentStep from "../steps/PaymentStep";
import Toast from "@components/ui/Toast";

const appointmentStepsConstants = [
  { icon: CalendarIcon, title: "Appointment" },
  { icon: Document1Icon, title: "Treatments" },
  { icon: MoneyIcon, title: "Payment" },
];

const ViewAppointmentForm = () => {
  const queryClient = useQueryClient();
  const selectedAppointment = usePatientStore((state) => state.selectedAppointment);
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen);
  const setStep = useDrawerStore((state) => state.setStep);
  const step = useDrawerStore((state) => state.step);


  const appointmentData = selectedAppointment?.appointmentData;

  const handleClose = () => {
    setDrawerOpen(false);
    setStep(1);
    queryClient.removeQueries({ queryKey: ["appointmentPatientCheckupData"] });
  };

  const fetchCheckupData = async () => {
    try {
      const response = await getAppointmentCheckup(selectedAppointment?.appointmentData?._id);
      return convertPatientCheckups(response) as DentalCheckupResponseType;
    } catch (error) {
      console.error("Error fetching checkup data:", error);
      return {
        checkupAppointmentId: "",
        checkupPatientId: "",
        checkupData: {
          generalCheckup: [],
          sectionCheckup: [],
          toothCheckup: [],
        },
        agreementDocuments: [],
      };
    }
  };

  const { data:checkup, isLoading } = useQuery({
    queryKey: ["appointmentPatientCheckupData"],
    queryFn: fetchCheckupData,
  });

  const { data:treatmentCost, isLoading: isPaymentLoading } = useQuery({
    queryKey:["appointmentTreatmentCost"],
    queryFn: async () => {
      const data = await getTreatmentCost(selectedAppointment.appointmentData._id )
      return data
    }
  })

  const { data: bills, isLoading: isBillsLoading } = useQuery({
    queryKey: ["appointmentBills"],
    queryFn: async () => {
      const data = await getBills(selectedAppointment.appointmentData._id);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: () => cancelAppointment(appointmentData._id),
    onSuccess: () => {
      setDrawerOpen(false)
      queryClient.invalidateQueries({queryKey: ['patientAppointmentsData']});
      toast.custom(() => (
        <Toast title={appointmentData.appointmentSerialId} message="has been cancelled" subtitle={formatISODateWithStringWithSuffix(appointmentData.appointmentDate.start)} status="success"/>
      ),{duration:5000});    
    }
  })

  const handleCancelAppointment = async () => {
    mutation.mutate()
  }
  
  const hasGeneralCheckup = Array.isArray(checkup?.checkupData?.generalCheckup) && checkup.checkupData.generalCheckup.length > 0;
  const hasSectionCheckup = Array.isArray(checkup?.checkupData?.sectionCheckup) && checkup.checkupData.sectionCheckup.length > 0;
  const hasToothCheckup = Array.isArray(checkup?.checkupData?.toothCheckup) && checkup.checkupData.toothCheckup.length > 0;

  const isDone = hasGeneralCheckup || hasSectionCheckup || hasToothCheckup;
  const isButtonDisabled = isLoading || isPaymentLoading || isBillsLoading
  const isCancelled = appointmentData?.appointmentStatus === "Cancelled";

  return (
    <article className="flex flex-col w-full h-full">
      {/* Header Section */}
      <section className="flex justify-between px-6 py-4 gap-2 border-b border-gray-200">
        <div className="flex-1 flex items-center gap-2">
          <label className="text-gray-500">Appointment ID</label>
          <h1 className="text-xl text-gray-700 font-medium">
            #{appointmentData?.appointmentSerialId || "N/A"}
          </h1>
        </div>
        <button className="w-8 h-8" type="button" onClick={handleClose}>
          <CloseIcon className="stroke-1 stroke-gray-500 w-full h-full" />
        </button>
      </section>

      {/* Stepper Section */}
      <section className="mt-6 mx-4">
        <Stepper steps={appointmentStepsConstants} step={step} setStep={setStep} />
      </section>

      {/* Content Section */}
      <section 
        className={`flex flex-col w-full h-full gap-4 overflow-hidden 
          ${step === 3 && "rounded-b-3xl"}
        `}
      >
        {step === 1 && <AppointmentStep agreementDocuments={checkup?.agreementDocuments as any} />}
        {step === 2 && checkup && <CheckupStep checkup={checkup} />}
        {step === 3 && treatmentCost && <PaymentStep treatmentCost={treatmentCost} bills={bills} />}
      </section>

      {/* Footer Section */}
      {!isCancelled && step !== 3 && (
        <section className="flex flex-col gap-6 w-full px-6 flex-1 items-end justify-end p-6 border-t border-gray-200">
          {isDone ? 
            <Button
              variant={isButtonDisabled ? "disabled" : "primary"}
              disabled={isButtonDisabled}
              className="w-full"
              onClick={() => setStep(step + 1)}
            >
              Proceed
            </Button>
          : 
            <Button
              variant={isButtonDisabled || mutation.isPending? "disabled" : "danger"}
              disabled={isButtonDisabled || mutation.isPending}
              className="w-full"
              onClick={handleCancelAppointment}
            >
              Cancel
            </Button>
          }
        </section>
      )}
    </article>
  );
};

export default ViewAppointmentForm;
