import PaymentOutlet from "@features/shared/payments/components/outlets/PaymentOutlet";
import AdminLayout from "@layouts/AdminLayout";
import AssistantLayout from "@layouts/AssistantLayout";


type StaffPatientPageProps = {
  role: string;
}

const StaffPaymentPage = ({ role }:StaffPatientPageProps) => {
  let Layout;
  switch (role) {
    case "admin":
      Layout = AdminLayout;
      break;
    case "assistant":
      Layout = AssistantLayout;
      break;
    default:
      Layout = AdminLayout; 
  }

  return (
    <Layout>
      <PaymentOutlet />
    </Layout>
  );
};

export default StaffPaymentPage;
