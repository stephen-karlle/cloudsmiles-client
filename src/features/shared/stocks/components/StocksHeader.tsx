import { useDrawerStore } from '@stores/drawer.store';
import { getStocks } from '../services/stock.services';
import { useStocksStore } from '../stores/stocks.store';
import { useQuery } from '@tanstack/react-query';
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import LinkButton from '../../../../components/shared/LinkButton'
import Seperator from '@components/ui/Seperator';
import StackedBarChart from './header/StackedBarChart';
import BeakerIcon from '@icons/linear/BeakerIcon';
import TableHeaderSkeleton from '@components/shared/skeletons/TableHeaderSkeleton';
import AddNewProductForm from './forms/AddNewProductForm';
import Button from '@components/ui/Button';
import FilterLinesIcon from '@icons/linear/FilterLinesIcon';
import PlusIcon from '@icons/linear/PlusIcon';
import PurchaseOrderForm from './forms/PurchaseOrderForm';

const StocksHeader = () => {
  
  const activeOutlet = useStocksStore((state) => state.activeOutlet);
  const setActiveOutlet = useStocksStore((state) => state.setActiveOutlet)
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)


  const { data, isLoading } = useQuery(
    {
      queryKey: ['stocksHeaderData'],
      queryFn: getStocks,
    }
  );

  const handleOpenAddProductDrawer = () => {
    setDrawerOpen(true)
    setMainSheet({
      name: "MainSheet1",
      component: <AddNewProductForm />
    })
  }

  const handleOpenPurchaseOrderDrawer = () => {  
    setDrawerOpen(true)
    setMainSheet({
      name: "MainSheet1",
      component: <PurchaseOrderForm />
    })
  }
  

  return (
     isLoading  ? (
       <TableHeaderSkeleton />
     ) : (
       <section
         className="h-fit w-full flex flex-col bg-white "
       >            
        <header className="h-24 w-full flex items-center justify-start gap-4 p-6 ">
          <section className="flex items-start justify-start h-full">
            <figure className="w-10 h-10 rounded-full bg-lime-50 flex p-1 items-center justify-center">
              <BeakerIcon className="w-6 h-6 stroke-2 stroke-lime-500" />
            </figure>
          </section>
          <section className="flex flex-col items-start gap-1 h-full">
            <label className="text-xs font-medium tracking-wide text-gray-500">TOTAL ASSET VALUE</label>
            <div className="flex items-center justify-center">
              <PhilippinePesoIcon className="stroke-2 stroke-gray-900 w-8 h-8" />
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">{(data.totalAssetValue).toLocaleString('en-US')}</h1>
            </div>
          </section>
          <Seperator className="h-16 mx-4" />
          <StackedBarChart data={data.stocks} totalProducts={data.totalProducts} />
        </header>
         <header className="w-full flex gap-8 items-center justify-start h-auto px-6">
            <LinkButton 
              onClick={()=>setActiveOutlet("Inventory")}
              isActive={activeOutlet === "Inventory"} 
            >
              Inventory
            </LinkButton>
            <LinkButton 
              onClick={()=>setActiveOutlet("Order")}
              isActive={activeOutlet === "Order"} 
            >
              Orders
            </LinkButton>
          </header>
         <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
           <Button variant="secondary" className="gap-2">
             <FilterLinesIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
             Filters
           </Button>
            <Button 
              variant="primary"
              onClick={activeOutlet === "Inventory" ? handleOpenAddProductDrawer : handleOpenPurchaseOrderDrawer}
            >
              <PlusIcon className="stroke-2 stroke-white" />
              New {activeOutlet === "Inventory" ? "Product" : "Order"}
            </Button>
         </header>
       </section>
     )
  )
}

export default StocksHeader
