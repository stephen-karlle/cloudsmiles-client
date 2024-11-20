import { useState } from 'react'
import { DashboardVisitType } from '../../types/dashboard.types'
import { privateApiClient } from '@constants/api.constants'
import { useQuery } from '@tanstack/react-query'
import { convertMonthToNumber } from '../../utils/converter.utils'
import { pdf } from '@react-pdf/renderer'
import Button from '@components/ui/Button'
import AreaChart from '../charts/AreaChart'
import FilterButton from '../inputs/FilterButton'
import PrintIcon from '@icons/linear/PrintIcon'
import AppointmentDocument from '../documents/AppointmentDocument'

const VisitCard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('None')
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const [visits, setVisits] = useState<DashboardVisitType>({
    totalVisits: 0,
    visits: [],
    data: []
  })

  const getVisits = async () => {
    const month = convertMonthToNumber(selectedMonth); 
    try {
      const res = await privateApiClient.get("/dashboard/v1/visits", {
        params: {
          month: month,
          year: selectedYear,
        },
      });
      setVisits(res.data as DashboardVisitType);
      return res.data as DashboardVisitType;
    } catch (error) {
      console.error(error);
    }
  };

  useQuery({
    queryKey: ['visitsAnalyticsData', selectedMonth, selectedYear],
    queryFn: getVisits,
  })

  const handlePrint = async () => {
    const blob = await pdf(<AppointmentDocument visits={visits.visits} />).toBlob();
    const newWindow = window.open(URL.createObjectURL(blob), '_blank');
    if (newWindow) {
      newWindow.print();
    }
  };

  return (
    <div className="w-full h-full gap-6 ">
      <div className="w-full h-full flex-col gap-4 items-center bg-white ring-1 rounded-md ring-gray-200 flex justify-start p-4 ">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-medium text-gray-700">Visits Summary</h1>
          <div className="flex items-center justify-center w-fit gap-4 z-20">
            <Button 
              variant='secondary' 
              className="w-fit h-8 flex items-center gap-2 "
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
              position="right"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Visits</p>
            <h1 className="text-2xl font-semibold text-gray-700 flex items-center">
              {(visits.totalVisits).toLocaleString('en-US')}
            </h1>
          </div>
        </div>
        <AreaChart visits={visits.data} />
      </div>
    </div>  
  )
}

export default VisitCard