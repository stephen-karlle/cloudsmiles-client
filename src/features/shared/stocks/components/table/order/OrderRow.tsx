import { ReactNode, useRef, useState } from 'react';
import { OrderResponseType } from '@features/shared/stocks/types/order.types';
import { TableData, TableRow } from '@components/ui/DataTable';
import { isNew } from '@utils/date.utils';
import { useStocksStore } from '@features/shared/stocks/stores/stocks.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDrawerStore } from '@stores/drawer.store';
import { toast } from 'sonner';
import { deleteOrder } from '@features/shared/stocks/services/order.services';
import { motion } from 'framer-motion'
import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';
import { createActivity } from '@features/admin/activities/services/activity.services';
import { useUserStore } from '@stores/user.store';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import BankIcon from '@icons/linear/BankIcon';
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import CheckIcon from '@icons/linear/CheckIcon';
import Button from '@components/ui/Button';
import Drawer from '@components/ui/Drawer';
import ReceiveOrderForm from '../../forms/ReceiveOrderForm'
import PopOver from '@components/ui/PopOver';
import EditIcon from '@icons/linear/EditIcon';
import DeleteIcon from '@icons/linear/DeleteIcon';
import Toast from '@components/ui/Toast';
import DeleteModal from '@components/ui/DeleteModal';
import EditOrderForm from '../../forms/EditOrderForm';
import ViewOrderForm from '../../forms/ViewOrderForm';

interface IInventoryRow {
  order: OrderResponseType;
  index: number;
  gridTemplate: string;
}

const OrderRow = ({
  order,
  index,
  gridTemplate,
}: IInventoryRow ) => {
   
  const user = useUserStore((state) => state.user)
  const queryClient = useQueryClient()
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [ action, setAction ] = useState<string>('')
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false);
  const isDrawerOpen = useDrawerStore((state) => state.drawerStates[order.orderSerialId])
  const toggleDrawer = useDrawerStore((state) => state.toggleDrawer)
  const setSelectedOrder = useStocksStore((state) => state.setSelectedOrder)
  
  const received = order.orderStatus === "completed"
  const totalPrice = order.orderProducts.reduce((acc, product) => acc + (product.productQuantity * product.productId.productUnitPrice), 0)
  
  const totalProducts = order.orderProducts.length
  const productCompleted = order.orderProducts.filter(product => product.productStatus === 'success').length


  const handleOpenDrawer = (action: string) => {
    setAction(action)
    setSelectedOrder(order)
    toggleDrawer(order.orderSerialId)
  }

  
  const mutation = useMutation({
    mutationFn: () => deleteOrder(order._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['ordersTableData']});
      toast.custom(() => (
        <Toast title={order.orderSerialId} message="has been deleted" subtitle="" status="success"/>
      ),{duration:5000});    
    }
  })

  const component: Record<string, ReactNode> = {
    'edit': <EditOrderForm />,
    'receive': <ReceiveOrderForm />,
    'view': <ViewOrderForm />
  }


  const handleDelete = async () => {
    mutation.mutate()
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Order ${order.orderSerialId} has been permanently removed.`,
        activityAction: "Delete",
      })
    }
  }


  return (
    <TableRow 
      index={index}
      key={index}
      gridTemplateColumns={gridTemplate}   
      className=''
    >
      <DeleteModal 
        className="w-[32rem]"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Delete Order"
        message="This action cannot be undone. This will permanently delete your order from our servers."
        confirmation={`DELETE ${order.orderSerialId}`}
        handleSubmit={handleDelete}
        isLoading={mutation.isPending}
      />
      <Drawer
        isOpen={isDrawerOpen}
        mainSheet={{
          name: `OrderDrawer-${order.orderSerialId}`,
          component: component[action],
        }}
        activeSheets={[]}
      />
      <TableData className="flex items-center gap-4">
        <div
          className="flex flex-col items-start justify-start gap-1"
        >
          <div className="flex items-center gap-2">
            <span>#{order.orderSerialId}</span>
            {isNew(order.createdAt) && <span className="flex shrink-0 uppercase text-xs px-2 py-1 rounded-full bg-red-50 text-red-500">NEW</span>}          
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>
              {totalProducts + ' item' + (totalProducts > 1 ? 's' : '')}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span className="flex items-center">
              <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
              {totalPrice.toLocaleString('en-US')}
            </span>
          </div>
        </div>
      </TableData>
      <TableData className="flex items-center gap-2">
        {formatISODateWithStringWithSuffix(order.createdAt)}
      </TableData>
      <TableData className="flex items-center gap-2">
        <BankIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
        {order.orderVendorId.vendorCompanyName}
      </TableData>
      <TableData className="flex items-center gap-2">
        <span className={`
          text-xs uppercase px-2 py-1 rounded-full
          ${order.orderStatus === 'pending' && 'text-amber-500 bg-amber-50'}
          ${order.orderStatus === 'completed' && 'text-green-500 bg-green-50'}
          ${order.orderStatus === 'partial' && 'text-purple-500 bg-purple-50'}
          ${order.orderStatus === 'cancelled' && 'text-red-500 bg-red-50'}
        `}>{order.orderStatus}</span>
      </TableData> 
      
      <TableData className="flex items-center gap-2">
        <div className={`
         h-1 rounded-full w-32 bg-gray-200 relative 
        `}>
          <motion.div 
            className="h-1 bg-green-500 rounded-full absolute left-0" 
            animate={{ width: `${(productCompleted / totalProducts) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
          </motion.div>
        </div>
        <label>
          {productCompleted + "/" + totalProducts}
        </label>
      </TableData>
      <TableData className="flex items-center justify-start pl-10 gap-2">
        {order.orderSendEmail && (
          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
            <CheckIcon className="w-5 h-5 stroke-2 stroke-white" />
          </div>
        )}
      </TableData>
      <TableData
        className="flex items-center justify-end w-full h-full relative gap-4"
      >
        <Button
          variant= "secondary"
          className="px-4"
          onClick={received ? () => handleOpenDrawer('view') : () => handleOpenDrawer('receive')}
        >
          {received ? "View" : "Receive"}   
        </Button>
        <button 
          ref={buttonRef}
          className=""
          onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
        >
          <ThreeDotsIcon className="w-5 h-5 stroke-2 stroke-gray-500 fill-gray-500 -rotate-90" />
          <PopOver 
            anchorRef={buttonRef}
            isOpen={isPopoverOpen}
            onClose={() => {
              setIsPopoverOpen(false);
            }}              
            className=" top-12 right-8  py-2 flex flex-col h-fit"
            position='bottom'
          >
            <button 
              type="button" 
              className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-gray-500 flex items-center gap-2"
              onClick={()=>handleOpenDrawer('edit')}
            >
              <EditIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
              Edit
            </button>
            <hr className="border-gray-200 my-1" />
            <button 
              type="button" 
              className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-rose-500 flex items-center gap-2"
              onClick={()=>setIsDeleteModalOpen(true)}
            >
              <DeleteIcon className="stroke-2 stroke-rose-500 w-4 h-4 " />
              Delete
            </button>
          </PopOver>  
        </button>

      </TableData>
    </TableRow>
  )
}

export default OrderRow
