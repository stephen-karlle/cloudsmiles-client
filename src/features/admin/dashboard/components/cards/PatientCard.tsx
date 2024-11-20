import { AnimatePresence, motion } from 'framer-motion'
import { DashboardPatientType } from '../../types/dashboard.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { privateApiClient } from '@constants/api.constants'
import { convertMonthToNumber } from '../../utils/converter.utils'
import Button from '@components/ui/Button'
import PatientDocument from '../documents/PatientDocument'
import PrintIcon from '@icons/linear/PrintIcon'
import FilterButton from '../inputs/FilterButton'

const PaymentCard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('None')
  const [selectedYear, setSelectedYear] = useState<string>('2024')

  const [patients, setPatients] = useState<DashboardPatientType>({
    patients: [],
    totalPatients: 0,
    newPatients: {
      value: 0,
      percentage: 0
    },
    oldPatients: {
      value: 0,
      percentage: 0
    }
  })

  const getPatients = async () => {
    const month = convertMonthToNumber(selectedMonth); 

    try {
      const res = await privateApiClient.get('/dashboard/v1/patients',{
        params: {
          month: month,
          year: selectedYear,
        },
      })
      setPatients(res.data as DashboardPatientType)
      return res.data as DashboardPatientType
    } catch (error) {
      console.error(error)
    }
  }

  useQuery({
    queryKey: ['patientsAnalyticsData', selectedMonth, selectedYear],
    queryFn: getPatients,
    staleTime: 0
  })

  const gridTemplateCols = `${patients.newPatients.percentage}% ${patients.oldPatients.percentage}%`

  const oldPatients = patients.oldPatients
  const newPatients = patients.newPatients

  const handlePrint = async () => {
    const blob = await pdf(<PatientDocument patients={patients.patients} />).toBlob();
    const newWindow = window.open(URL.createObjectURL(blob), '_blank');
    if (newWindow) {
      newWindow.print();
    }
  };

  const isZero = patients.totalPatients === 0
  return (
    
    <div className="w-full h-full flex-col items-center bg-white ring-1 rounded-md ring-gray-200 flex justify-start p-4">
      <div className="flex items-center justify-between w-full gap-4">
        <h1 className="text-lg font-medium text-gray-700">Patients</h1>
        <div className="w-fit items-center gap-4 flex">
          <Button
            variant="secondary"
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
            position="right"
          />
        </div>
      </div>
      <AnimatePresence>
        {isZero ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <div
            className="h-full w-full pt-4"
            style={{
              display: 'grid',
              gridTemplateColumns: gridTemplateCols,
            }}
          >
          {newPatients.percentage !== 0 && (
            <div className="w-full h-full border-l border-gray-200 flex flex-col">
              <div className="flex flex-col justify-between h-full px-2 py-1">
                <h1 className="text-lg font-medium text-gray-700">{newPatients.value}</h1>
                <div className="h-fit w-full flex flex-col">
                  <p className="text-xs text-gray-700">{newPatients.percentage.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">New</p>
                </div>
              </div>
              <motion.div
                className="h-4 bg-lime-400 w-11/12"
                initial={{ width: 0 }}
                animate={{ width: `100%` }}
                transition={{ duration: 2, ease: 'circInOut' }}
              />
            </div>
          )}
            {oldPatients.percentage !== 0 && (
              <div className="w-full h-full border-l border-gray-200 flex flex-col">
                <div className="flex flex-col justify-between h-full px-2 py-1">
                  <h1 className="text-lg font-medium text-gray-700">{oldPatients.value}</h1>
                  <div className="h-fit w-full flex flex-col">
                    <p className="text-xs text-gray-700 font-medium">{oldPatients.percentage.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap">Old</p>
                  </div>
                </div>
                <motion.div
                  className="h-4 stripes-patients"
                  initial={{ width: 0 }}
                  animate={{ width: `100%` }}
                  transition={{ delay: 2, duration: 2, ease: 'circInOut' }}
                />
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PaymentCard
