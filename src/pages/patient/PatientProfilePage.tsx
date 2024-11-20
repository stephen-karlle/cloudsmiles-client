import { useUserStore } from "@stores/user.store"
import PatientProfileOutlet from "@features/shared/patients/components/outlets/PatientProfileOutlet"
import PatientLayout from "@layouts/PatientLayout"

const PatientProfilePage = () => {
  const user = useUserStore((state) => state.user)
  return (
    <PatientLayout>
      <PatientProfileOutlet id={user._id}  />
    </PatientLayout>
  )
}

export default PatientProfilePage