import { Document, Page, Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils";
import FooterDocument from "./FooterDocument";
import HeaderDocument from "./HeaderDocument";
import { PatientResponseType } from "@features/shared/patients/types/patient.types";

type PatientDocumentProps = {
  patients: PatientResponseType[];
};

// https://react-pdf-repl.vercel.app/
const PatientDocument = ({ patients}:PatientDocumentProps ) => {
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
              Patient Report
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
              <Text style={tw('w-[60rem] text-start uppercase text-xs tracking-wide')}>Name</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Status</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Gender</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Joined at</Text>
            </View>
                   {/* Table Body */}
            {patients.map((patient) => (
              <View key={patient._id} style={tw('flex flex-row border-b border-gray-200 py-5')}>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-900 uppercase')}>#{patient.patientSerialId || 'N/A'}</Text>
                <Text style={tw('w-[60rem] text-xs text-start text-gray-900 uppercase')}>{patient.patientFullName || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-500 uppercase')}>{patient.patientStatus || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-500 uppercase')}>{patient.patientGender || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-900 uppercase')}>{formatISODateWithStringWithSuffix(patient.createdAt)}</Text>
              </View>
            ))}

          </View>
        </View>
        <FooterDocument />
      </Page>
    </Document>
  );
};

export default PatientDocument;

    
