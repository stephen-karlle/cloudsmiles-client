import { useState } from 'react';
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";
import { stockColors } from "../../constants/color.constants";
import { DashboardStockType } from '../../types/dashboard.types';
import { privateApiClient } from '@constants/api.constants';
import { useQuery } from '@tanstack/react-query';
import { pdf } from '@react-pdf/renderer';
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon";
import Button from '@components/ui/Button';
import PrintIcon from '@icons/linear/PrintIcon';
import StocksDocument from '../documents/StocksDocument';

const StocksCard = () => {
  const [stocks, setStocks] = useState<DashboardStockType>({
    products: [],
    totalProducts: 0,
    totalValue: 0,
    lowStock: {
      _id: '',
      productName: '',
      productAvatar: '',
      productCategory: '',
      productDescription: '',
      productId: '',
      productQuantity: 0,
      productSku: '',
      productUnitPrice: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      vendorId: {
        _id: '',
        vendorAvatar: '',
        vendorAddress: '',
        vendorCompanyName: '',
        vendorContactPerson: '',
        vendorEmail: '',
        vendorPhoneNumber: '',
        vendorSerialId: '',
        vendorType: '', 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    },
    data: [
      { status: 'In Stock', value: 0 },
      { status: 'Low Stock', value: 0 },
      { status: 'Out of Stock', value: 0 },
    ]
  })

  const totalProducts = stocks.totalProducts
  const totalValue = stocks.totalValue
  const lowStock = stocks.lowStock
  const data = stocks.data

  const getStocks = async () => {
    try {
      const res = await privateApiClient.get('/dashboard/v1/stocks')
      setStocks(res.data as DashboardStockType)
      return res.data as DashboardStockType
    } catch (error) {
      console.error(error)
    }
  }

  useQuery({
    queryKey: ['stocksAnalyticsData'],
    queryFn: getStocks,
  })

  const percentages = data.map(item => ({
    status: item.status,
    percentage: Math.round((item.value / totalProducts) * 100),
  }));

  const gridTemplate = percentages.map(item => `${item.percentage}%`).join(' ');

  const handlePrint = async () => {
    const blob = await pdf(<StocksDocument stocks={stocks.products} />).toBlob();
    const newWindow = window.open(URL.createObjectURL(blob), '_blank');
    if (newWindow) {
      newWindow.print();
    }
  };


  return (
    <div className="w-full h-full flex-col gap-4 items-center bg-white ring-1 rounded-md ring-gray-200 flex justify-start p-4 ">
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className="text-lg font-medium text-gray-700">Stocks</h1>
          <Button 
            variant='secondary' 
            className="w-fit h-8 flex items-center gap-2"
            onClick={handlePrint}
          >
            <PrintIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
            Print
          </Button>
        </div>
        <section className="flex flex-col w-full ">
          <div className="flex items-center gap-4 justify-start mb-4">
            <div className="flex flex-col gap-2 items-start w-full">
              <label className="text-xs tracking-wide text-gray-500 uppercase">Total Value</label>
              <h1 className="text-xl font-medium text-gray-700 flex items-center">
                <PhilippinePesoIcon className="w-6 h-6 stroke-2 stroke-gray-700" />
                {totalValue.toLocaleString('en-US')}
              </h1>
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
              <label className="text-xs tracking-wide text-gray-500 uppercase">Total Products</label>
              <h1 className="text-xl font-medium text-gray-700">{totalProducts}</h1>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full grid grid-flow-col gap-1 " style={{ gridTemplateColumns: gridTemplate }}>
              {data.map(( product, index) => (
                <motion.div 
                  key={index} 
                  className={`h-3 rounded-sm ${stockColors[product.status]}`} 
                  initial={{ width: 0 }}
                  animate={{ width: `100%` }}
                  transition={{ 
                    duration: 1, 
                    ease: 'circInOut',
                    delay: 0.5 * index

                  }}
                />
              ))}
            </div>
            <div className="flex gap-6 items-center justify-start">
              {data.map((product, index) => (
                <figure 
                  key={index}
                  className="flex items-center justify-start gap-1"
                >
                  <div  className={`w-2 h-2 rounded-sm ${stockColors[product.status]}`} />
                  <label className="text-sm text-gray-500">{product.status}</label>
                </figure>
              ))}
            </div>
          </div>
          <hr className="w-full border-t border-gray-200 mt-4" />
        </section>
        <div className="flex items-center w-full justify-between my-4 ">
          <label className="text-xs tracking-wide text-gray-500 uppercase ">Low Stocks</label>
          <Link to="/stocks" className="text-sm text-gray-500 underline underline-offset-2">View All</Link>
        </div>
        <div className="flex items-center ring-1 ring-gray-200 w-full rounded-md p-4">
          <div className="flex items-center w-full gap-4">

            <h1 className="text-base font-medium text-gray-700 w-full">{lowStock.productName}</h1>
          </div>
          <div className="w-full flex items-center justify-end">
            <label className="text-sm text-gray-500">QTY</label>
            <h1 className="text-sm font-medium text-gray-700 ml-2">{lowStock.productQuantity}</h1>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default StocksCard