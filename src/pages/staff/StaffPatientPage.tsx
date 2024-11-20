import PatientOutlet from "@features/shared/patients/components/outlets/PatientOutlet";
import AdminLayout from "@layouts/AdminLayout";
import AssistantLayout from "@layouts/AssistantLayout";
import DentistLayout from "@layouts/DentistLayout";


type StaffPatientPageProps = {
  role: string;
}

const StaffPatientPage = ({ role }:StaffPatientPageProps) => {
  let Layout;
  switch (role) {
    case "admin":
      Layout = AdminLayout;
      break;
    case "assistant":
      Layout = AssistantLayout;
      break;
    case "dentist":
      Layout = DentistLayout;
      break;
    default:
      Layout = AdminLayout; // default to AdminLayout if role is unknown
  }

  return (
    <Layout>
      <PatientOutlet />
    </Layout>
  );
};

export default StaffPatientPage;
