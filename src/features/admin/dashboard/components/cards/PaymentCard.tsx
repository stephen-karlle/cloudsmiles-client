import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { convertMonthToNumber } from "../../utils/converter.utils"
import { privateApiClient } from "@constants/api.constants"
import { DashboardPaymentType } from "../../types/dashboard.types"
import { pdf } from "@react-pdf/renderer"
import Button from "@components/ui/Button"
import BarChart from "../charts/BarChart"
import FilterButton from "../inputs/FilterButton"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import PrintIcon from "@icons/linear/PrintIcon"
import PaymentDocument from "../documents/PaymentDocument"

const PaymentCard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('None')
  const [selectedYear, setSelectedYear] = useState<string>('2024')

  const [payments, setPayments] = useState<DashboardPaymentType>({
    totalPayments: 0,
    payments: [],
    data: [],
    partialPayments: 0,
    paidPayments: 0
  })

  const getPayments = async () => {
    const month = convertMonthToNumber(selectedMonth); 
    try {
      const res = await privateApiClient.get("/dashboard/v1/payments", {
        params: {
          month: month,
          year: selectedYear,
        },
      });
      setPayments(res.data as DashboardPaymentType);
      return res.data as DashboardPaymentType;
    } catch (error) {
      console.error(error);
    }
  };

  useQuery({
    queryKey: ['paymentsAnalyticsData', selectedMonth, selectedYear],
    queryFn: getPayments,
  })

  const handlePrint = async () => {
    const blob = await pdf(<PaymentDocument payments={payments.payments} />).toBlob();
    const newWindow = window.open(URL.createObjectURL(blob), '_blank');
    if (newWindow) {
      newWindow.print();
    }
  };


  return (
    <div className="w-full h-full flex-col items-center bg-white ring-1 rounded-md ring-gray-200 flex justify-start p-4 ">
      <div className="flex items-center justify-between w-full gap-4 ">
        <h1 className="text-lg font-medium text-gray-700">Payments</h1>
        <div className="w-fit items-center gap-4 flex">
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
            position="right"
          />
        </div>
      </div>
      <div className="flex w-full justify-between items-center">        
        <div className="w-full flex items-start gap-2">
          <div className="flex flex-col items-start w-full" >
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Payments</p>
            <div className="flex items-center">
              <p className="text-base font-medium text-gray-700">{payments.totalPayments}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8 w-full py-4 justify-end">
          <div className="w-fit flex items-start gap-2">
            <div className="w-4 h-1 rounded-sm bg-green-500 mt-1" />
            <div className="flex flex-col items-start w-full" >
              <p className="text-xs text-gray-500 uppercase tracking-wide">Paid</p>
              <div className="flex items-center">
                <p className="text-base font-medium text-gray-700">{payments.paidPayments}</p>
              </div>
            </div>
          </div>
          <div className="w-fit flex items-start gap-2">
            <div className="w-4 h-1 rounded-sm bg-purple-500 mt-1" />
            <div className="flex flex-col items-start w-full" >
              <p className="text-xs text-gray-500 uppercase tracking-wide">Partial</p>
              <div className="flex items-center">
                <p className="text-base font-medium text-gray-700">{payments.partialPayments}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BarChart payments={payments.data} />
    </div>  
  )
}

export default PaymentCard
