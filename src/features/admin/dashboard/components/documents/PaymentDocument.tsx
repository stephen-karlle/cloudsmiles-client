import { Document, Page, Text, View } from "@react-pdf/renderer";
import { PaymentResponseType } from "@features/shared/payments/types/payment.types";
import { createTw } from "react-pdf-tailwind";
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils";
import FooterDocument from "./FooterDocument";
import HeaderDocument from "./HeaderDocument";

type PaymentDocumentProps = {
  payments: PaymentResponseType[];
};

const PaymentDocument = ({ payments }:PaymentDocumentProps ) => {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'], 
      },
    },
  });

  return (
    <Document>
      <Page size="A4" style={tw('p-12 font-sans')} wrap>
        <HeaderDocument />
        <View style={tw('mb-6 w-full ')}>
          <View style={tw('flex flex-row items-center justify-between mb-6 gap-2')}>
            <Text style={tw('text-md text-green-500 uppercase tracking-tighter text-center font-bold')}>
              Payment Report
            </Text>
            <Text style={tw('text-sm text-lime-500 uppercase tracking-tighter text-center font-bold')}>
              Generated at {formatISODateWithStringWithSuffix(new Date().toISOString())}
            </Text>
          </View>
          <View style={tw('w-full mb-4 h-full z-50')}>
            {/* Table Header */}
            <View 
            style={tw('flex flex-row text-sm bg-gray-50 py-2')}
            >
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Payment ID</Text>
              <Text style={tw('w-[50rem] text-start uppercase text-xs tracking-wide')}>Patient Name</Text>
              <Text style={tw('w-[30rem] text-start uppercase text-xs tracking-wide')}>Total Cost</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Method</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Joined at</Text>
            </View>
                   {/* Table Body */}
            {payments.map((payment) => (
              <View key={payment.paymentSerialId} style={tw('flex flex-row border-b border-gray-200 py-5')}>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-900 uppercase')}>#{payment.paymentSerialId || 'N/A'}</Text>
                <Text style={tw('w-[50rem] text-xs text-start text-gray-900 uppercase')}>{payment.paymentAppointmentId.appointmentPatientId.patientFullName || 'N/A'}</Text>
                <Text style={tw('w-[30rem] text-xs text-start text-gray-500 uppercase')}>{(payment.paymentTotalCost).toLocaleString('en-US') || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-500 uppercase')}>{payment.paymentMethod || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-900 uppercase')}>{formatISODateWithStringWithSuffix(payment.createdAt)}</Text>
              </View>
            ))}

          </View>
        </View>
        <FooterDocument />
      </Page>
    </Document>
  );
};

export default PaymentDocument;

    
