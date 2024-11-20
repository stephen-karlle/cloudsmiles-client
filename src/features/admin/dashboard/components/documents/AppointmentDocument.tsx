import { Document, Page, Text, View } from "@react-pdf/renderer";
import { AppointmentType } from "../../types/dashboard.types";
import { createTw } from "react-pdf-tailwind";
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils";
import FooterDocument from "./FooterDocument";
import HeaderDocument from "./HeaderDocument";

type AppointmentDocumentProps = {
  visits: AppointmentType[];
};

const AppointmentDocument = ({ visits }:AppointmentDocumentProps ) => {
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
              Appointment Report
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
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>ID</Text>
              <Text style={tw('w-[40rem] text-start uppercase text-xs tracking-wide')}>Patient Name</Text>
              <Text style={tw('w-[40rem] text-start uppercase text-xs tracking-wide')}>Dentist Name</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>STATUS</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>CREATED AT</Text>
            </View>
                   {/* Table Body */}
            {visits.map((visit) => (
              <View key={visit._id} style={tw('flex flex-row border-b border-gray-200 py-5')}>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-900 uppercase')}>#{visit.appointmentSerialId || 'N/A'}</Text>
                <Text style={tw('w-[40rem] text-xs text-start text-gray-900 uppercase')}>{visit.appointmentPatientId.patientFullName || 'N/A'}</Text>
                <Text style={tw('w-[40rem] text-xs text-start text-gray-500 uppercase')}>{(visit.appointmentDentistId.dentistFullName) || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-500 uppercase')}>{visit.appointmentStatus || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-900 uppercase')}>{formatISODateWithStringWithSuffix(visit.appointmentDate.end)}</Text>
              </View>
            ))}

          </View>
        </View>
        <FooterDocument />
      </Page>
    </Document>
  );
};

export default AppointmentDocument;

    
