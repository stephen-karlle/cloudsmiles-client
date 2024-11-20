import PatientOutlet from "@features/shared/patients/components/outlets/PatientOutlet"
import AssistantLayout from "@layouts/AssistantLayout"


const AssistantPatientPage = () => {

  return (
    <AssistantLayout>
      <PatientOutlet />
    </AssistantLayout>
  )
}

export default AssistantPatientPage
