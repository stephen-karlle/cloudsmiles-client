import { ICheckupResponse, DentalCheckupRequestType, DentalCheckupResponseType } from "../types/appointment.types";


export const convertCheckups = (response: ICheckupResponse): DentalCheckupRequestType | null => {
  
  if (response.checkupData.length === 0) return null;
  const checkups = response.checkupData;


  return {
    checkupAppointmentId: checkups[0].checkupAppointmentId._id,
    checkupPatientId: checkups[0].checkupPatientId._id,
    checkupData: {
      toothCheckup: checkups.filter((checkup) => checkup.checkupType === "Tooth")
        .map((checkup) => ({
          toothNumber: checkup.checkupToothNumber,
          toothTreatmentId: checkup.checkupTreatmentId,
           toothTreatmentPlans: checkups
            .filter((subCheckup) => 
            subCheckup.checkupType === "Tooth" && 
            subCheckup.checkupToothNumber === checkup.checkupToothNumber
          )
            .map((innerCheckup) => ({
              _id: innerCheckup._id,
              toothTreatmentId: innerCheckup.checkupTreatmentId._id,
              toothCondition: innerCheckup.checkupCondition,
              toothStatus: innerCheckup.checkupStatus,
            })
          )
        })
      ),

      sectionCheckup: Object.values(checkups.filter((checkup) => checkup.checkupType === "Section")
        .reduce((acc: { [key: string]: any }, checkup) => {
          const section = checkup.checkupSection as string;
          if (!acc[section]) {
            acc[section] = {
              _id: checkup._id,
              sectionName: section,
              sectionTreatmentPlans: []
            };
          }
          acc[section].sectionTreatmentPlans.push({
            _id: checkup._id,
            sectionTreatmentId: checkup.checkupTreatmentId._id,
            sectionCondition: checkup.checkupCondition,
            sectionStatus: checkup.checkupStatus,
          });
          return acc;
        }, {})
      ),

      generalCheckup: checkups
        .filter((checkup) => checkup.checkupType === "General")
        .map((checkup) => ({
          _id: checkup._id,
          generalTreatmentId: checkup.checkupTreatmentId._id,
          generalStatus: checkup.checkupStatus,
          generalNotes: checkup.checkupNotes,
        })
      )
    },
    agreementDocuments: response.agreementDocuments.map((file) => {
      return {
        _id: file._id,
        documentName: file.documentName,
        documentUrl: file.documentUrl,
  
      };
    }),
  }
}

export const convertMilitaryTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const readableHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${readableHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export const convertMonthStringToDate = (month: string): Date => {
  const monthCount = parseInt(month.split(" ")[0], 10); // Extracts the number part from the string
  const resultDate = new Date(); // Start with the current date
  resultDate.setMonth(resultDate.getMonth() + monthCount); // Add the months to the current date

  return resultDate;
};

export const convertPatientCheckups = (response: ICheckupResponse): DentalCheckupResponseType | null => {
  
  if (response.checkupData.length === 0) return null;
  const checkups = response.checkupData;


  return {
    checkupAppointmentId: checkups[0].checkupAppointmentId._id,
    checkupPatientId: checkups[0].checkupPatientId._id,
    checkupData: {
      toothCheckup: checkups.filter((checkup) => checkup.checkupType === "Tooth")
        .map((checkup) => ({
          toothNumber: checkup.checkupToothNumber,
           toothTreatmentPlans: checkups
            .filter((subCheckup) => 
            subCheckup.checkupType === "Tooth" && 
            subCheckup.checkupToothNumber === checkup.checkupToothNumber
          )
            .map((innerCheckup) => ({
              _id: innerCheckup._id,
              toothTreatmentId: {
                ...innerCheckup.checkupTreatmentId,
              },
              toothCondition: innerCheckup.checkupCondition,
              toothStatus: innerCheckup.checkupStatus,
            })
          )
        })
      ),

      sectionCheckup: Object.values(checkups.filter((checkup) => checkup.checkupType === "Section")
        .reduce((acc: { [key: string]: any }, checkup) => {
          const section = checkup.checkupSection as string;
          if (!acc[section]) {
            acc[section] = {
              _id: checkup._id,
              sectionName: section,
              sectionTreatmentPlans: []
            };
          }
          acc[section].sectionTreatmentPlans.push({
            _id: checkup._id,
            sectionTreatmentId: {
              ...checkup.checkupTreatmentId,
            },
            sectionCondition: checkup.checkupCondition,
            sectionStatus: checkup.checkupStatus,
          });
          return acc;
        }, {})
      ),

      generalCheckup: checkups
        .filter((checkup) => checkup.checkupType === "General")
        .map((checkup) => ({
          _id: checkup._id,
          generalTreatmentId: {
            ...checkup.checkupTreatmentId,
          },
          generalStatus: checkup.checkupStatus,
          generalNotes: checkup.checkupNotes,
        })
      )
    },
    agreementDocuments: response.agreementDocuments.map((file) => {
      return {
        _id: file._id,
        documentName: file.documentName,
        documentUrl: file.documentUrl,
      };
    }),
  }
}
