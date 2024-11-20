import SettingsOutlet from "@features/shared/settings/components/outlets/SettingsOutlet";
import AdminLayout from "@layouts/AdminLayout";
import AssistantLayout from "@layouts/AssistantLayout";
import DentistLayout from "@layouts/DentistLayout";
import PatientLayout from "@layouts/PatientLayout";


type SettingsPageProps = {
  role: string;
}

const SettingsPage = ({ role }:SettingsPageProps) => {
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
    case "patient":
      Layout = PatientLayout;
      break;
    default:
      Layout = AdminLayout;
  }
  

  return (
    <Layout>
      <SettingsOutlet />
    </Layout>
  );
};

export default SettingsPage;
