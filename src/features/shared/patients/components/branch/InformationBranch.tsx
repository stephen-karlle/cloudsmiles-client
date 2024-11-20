import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils"
import { hygieneQuestionnairesConstants } from "@features/shared/calendar/constants/conditions.constants"
import { usePatientStore } from "../../stores/patient.store";

 


const InformationBranch = () => {
  const profile = usePatientStore((state) => state.selectedProfile);
  
  const patient = profile.patientData;
  const record = profile.recordData;
  
  const age = patient.patientDateOfBirth
    ? new Date().getFullYear() - new Date(patient.patientDateOfBirth).getFullYear()
    : 'Unknown Age'; // Fallback for undefined date of birth

  const recordData = record || null;

  const allergies = recordData?.recordAllergies?.length 
    ? recordData.recordAllergies.slice(0, 3).join(', ') 
    : "None";

  const sickness = recordData?.recordSickness?.length 
    ? recordData.recordSickness.slice(0, 3).join(', ') 
    : "None";


    const bloodPressure = record?.recordBloodPressure 
    ? `${record.recordBloodPressure.mm} MM / ${record.recordBloodPressure.hg} HG`
    : 'Not Available'; 
  
    const lastUpdated = recordData?.updatedAt 
    ? `Last updated at ${formatISODateWithStringWithSuffix(recordData.updatedAt)}`
    : 'Never Updated'; 

  const occlusi = recordData?.recordOralData?.occlusi || "None";
  const torusPalatinus = recordData?.recordOralData?.torusPalatinus || "None";
  const torusMandibularis = recordData?.recordOralData?.torusMandibularis || "None";
  const palatum = recordData?.recordOralData?.palatum || "None";
  const anomalousTeeth = recordData?.recordOralData?.anomalousTeeth || "None";
  const other = recordData?.recordOralData?.other || "None";

  const hygieneData = recordData?.recordHygieneData || [];
  const q1 = hygieneData[1] || "N/A";
  const q2 = hygieneData[2] || "N/A";
  const q3 = hygieneData[3] || "N/A";
  const q4 = hygieneData[4] || "N/A";
  const q5 = hygieneData[5] || "N/A";
  const q6 = hygieneData[6] || "N/A";
  const q7 = hygieneData[7] || "N/A";

  return (
    <article
      className="w-full h-full flex flex-col gap-8"
    >
      <section className="w-full px-8 h-fit flex flex-col gap-6 mt-8">
        <div className="w-full flex items-center gap-2 ">
          <span className="h-6 w-[2px] rounded-full bg-gray-700" />
          <h2 className="text-md font-medium text-gray-700 uppercase">Patient Data</h2>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">Age</label>
            <h1 className="text-md font-medium text-gray-700">
              {age + ' years old'}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">Gender</label>
            <h1 className="text-md font-medium text-gray-700">
              {patient.patientGender}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">Email</label>
            <h1 className="text-md font-medium text-gray-700">
              {patient.patientCredentialId.credentialEmail ? patient.patientCredentialId.credentialEmail : "No Email"}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">Phone Number</label>
            <h1 className="text-md font-medium text-gray-700">
              {patient.patientCredentialId.credentialPhoneNumber ? "(+63)" + patient.patientCredentialId.credentialPhoneNumber : "No Phone Number"}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal ">Address</label>
            <h1 className="text-md font-medium text-gray-700">
              {patient.patientAddress}
            </h1>
          </div>
        </div>
        <hr className="w-full border-t border-gray-200" />
      </section>  
      <section className="w-full px-8 h-fit flex flex-col gap-6 ">
        <div className="w-full flex items-center gap-2 ">
          <span className="h-6 w-[2px] rounded-full bg-gray-700" />
          <h2 className="text-md font-medium text-gray-700 uppercase">Tooth Data</h2>
          {lastUpdated && <label className="text-sm font-normal text-gray-500" >{lastUpdated}</label>}
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">Blood Pressure</label>
            <h1 className="text-md font-medium text-gray-700">
              {bloodPressure}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">Sickness</label>
            <h1 className="text-md font-medium text-gray-700">
              {sickness}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">Allergies</label>
            <h1 className="text-md font-medium text-gray-700">
              {allergies}
            </h1>
          </div>
        </div>
        <hr className="w-full border-t border-gray-200" />
      </section>  
      <section className="w-full px-8 h-fit flex flex-col gap-6 ">
        <div className="w-full flex items-center gap-2 ">
          <span className="h-6 w-[2px] rounded-full bg-gray-700" />
          <h2 className="text-md font-medium text-gray-700 uppercase">Oral Data</h2>
          {lastUpdated && <label className="text-sm font-normal text-gray-500" >{lastUpdated}</label>}
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              Occlusi
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {occlusi}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              Torus Palatinus
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {torusPalatinus}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              Torus Mandibularis
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {torusMandibularis}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              Palatum
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {palatum}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal ">
              Anomalous Teeth
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {anomalousTeeth}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal ">
              other
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {other}
            </h1>
          </div>
        </div>
        <hr className="w-full border-t border-gray-200" />
      </section>
      
      <section className="w-full px-8 h-fit flex flex-col gap-6 ">
        <div className="w-full flex items-center gap-2 ">
          <span className="h-6 w-[2px] rounded-full bg-gray-700" />
          <h2 className="text-md font-medium text-gray-700 uppercase">Oral Hygiene</h2>
          {lastUpdated && <label className="text-sm font-normal text-gray-500" >{lastUpdated}</label>}
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              {hygieneQuestionnairesConstants[0].question}
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {q1}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              {hygieneQuestionnairesConstants[1].question}
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {q2}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              {hygieneQuestionnairesConstants[2].question}
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {q3}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              {hygieneQuestionnairesConstants[3].question}
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {q4}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal ">
              {hygieneQuestionnairesConstants[4].question}
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {q5}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal ">
              {hygieneQuestionnairesConstants[5].question}
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {q6}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <label className="text-sm text-gray-500 gap-1 font-normal">
              {hygieneQuestionnairesConstants[6].question}
            </label>
            <h1 className="text-md font-medium text-gray-700">
              {q7}
            </h1>
          </div>

        </div>
        <hr className="w-full border-t border-gray-200" />
      </section>
      
    </article>
  )
}

export default InformationBranch