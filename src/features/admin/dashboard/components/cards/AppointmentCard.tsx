import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { privateApiClient } from "@constants/api.constants";
import { DashboardAppointmentType } from "../../types/dashboard.types";
import { convertMonthToNumber } from "../../utils/converter.utils";
import { appointmentColors } from "../../constants/color.constants";
import { pdf } from "@react-pdf/renderer";
import Button from "@components/ui/Button";
import PieChart from "../charts/PieChart"
import FilterButton from "../inputs/FilterButton";
import PrintIcon from "@icons/linear/PrintIcon";
import AppointmentDocument from "../documents/AppointmentDocument";

const AppointmentCard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('None')
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const [appointments, setAppointments] = useState<DashboardAppointmentType>({
    totalAppointments: 0,
    appointments: [],
    data: [
      { name: "Finished", value: 0 },
      { name: "Cancelled", value: 0 },
      { name: "Scheduled", value: 0 },
      { name: "Confirmed", value: 0 }
    ]
  })

  const getAppointments = async () => {
    const month = convertMonthToNumber(selectedMonth); 
    try {
      const res = await privateApiClient.get("/dashboard/v1/appointments", {
        params: {
          month: month,
          year: selectedYear,
        },
      });
      setAppointments(res.data as DashboardAppointmentType);
      return res.data as DashboardAppointmentType;
    } catch (error) {
      console.error(error);
    }
  };

  useQuery({
    queryKey: ['appointmentsAnalyticsData', selectedMonth, selectedYear],
    queryFn: getAppointments,
  })

  const handlePrint = async () => {
    const blob = await pdf(<AppointmentDocument visits={appointments.appointments} />).toBlob();
    const newWindow = window.open(URL.createObjectURL(blob), '_blank');
    if (newWindow) {
      newWindow.print();
    }
  };

  return (
    <div className="w-full h-full pb-6">
      <div className="w-full h-full flex-col gap-4 items-center bg-white ring-1 rounded-md ring-gray-200 flex justify-start p-4 ">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-medium text-gray-700">Appointments</h1>
          <div className="flex items-center justify-center w-fit gap-4 z-20">
            <Button 
              variant='secondary' 
              className="w-fit h-8 flex items-center gap-2"
              onClick={handlePrint}
            >
              <PrintIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
              Print
            </Button>
            <FilterButton 
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              position="left"
            />
          </div>
        </div>
        <div className="flex items-center w-full h-full ">
          <div className="w-full h-full">
            <PieChart appointments={appointments.data} />
          </div>
          <div className="w-full flex flex-col items-start justify-center h-full pl-4 pr-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Percentage</p>
            {appointments.data.map((entry, index) => (
              <div key={`cell-${index} ${entry}`} className="flex items-center justify-between h-8 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm " style={{ backgroundColor: appointmentColors[entry.name] }} />
                  <p className="text-sm text-gray-700">{entry.name}</p>
                </div>
                <p className="text-sm text-gray-700 font-medium">{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">Average</p>
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          {appointments.data.map((entry, index) => (
            <div key={`cell-${index} ${entry}`} className="flex items-start gap-4 ring-1 ring-gray-200 rounded-md px-4 py-2">
              <div className="w-4 h-1 rounded-sm mt-2" style={{ backgroundColor: appointmentColors[entry.name] }} />
              <div className="flex flex-col items-start">
                <p className="text-sm text-gray-500">{entry.name}</p>
                <h1 className="text-sm text-gray-700 font-medium">{entry.value}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>  
  )
}

export default AppointmentCard