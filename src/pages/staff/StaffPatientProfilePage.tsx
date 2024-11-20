import PatientProfileOutlet from "@features/shared/patients/components/outlets/PatientProfileOutlet"
import AdminLayout from "@layouts/AdminLayout"
import AssistantLayout from "@layouts/AssistantLayout";
import DentistLayout from "@layouts/DentistLayout";
import { useParams } from "react-router-dom";

type StaffProfilePageProps = {
  role: string;
}

const StaffProfilePage = ({ role }: StaffProfilePageProps) => {
  const { id } = useParams()

  let Layout;
  switch (role) {
    case "admin":
      Layout = AdminLayout;
      break;
    case "assistant":
      Layout = AssistantLayout;
      break;
    case "dentist":
      Layout = DentistLayout
      break;
    default:
      Layout = AdminLayout; 
  }

  return (
    <Layout >
      <PatientProfileOutlet id={id} />
    </Layout>
  )
}

export default StaffProfilePage
