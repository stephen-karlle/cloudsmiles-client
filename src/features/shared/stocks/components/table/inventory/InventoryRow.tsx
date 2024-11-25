import { useRef, useState } from 'react';
import { ProductResponseType } from '@features/shared/stocks/types/product.types';
import { TableData, TableRow } from '@components/ui/DataTable';
import { getStatusAndColor } from '../../../utils/product.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '@features/shared/stocks/services/product.services';
import { useDrawerStore } from '@stores/drawer.store';
import { useStocksStore } from '@features/shared/stocks/stores/stocks.store';
import { toast } from 'sonner';
import { isNew } from '@utils/date.utils';
import ThreeDotsIcon from '@icons/linear/ThreeDotsIcon';
import DeleteModal from '@components/ui/DeleteModal';
import Toast from '@components/ui/Toast';
import BankIcon from '@icons/linear/BankIcon';
import PopOver from '@components/ui/PopOver';
import EditIcon from '@icons/linear/EditIcon';
import DeleteIcon from '@icons/linear/DeleteIcon';
import PhilippinePesoIcon from '@icons/linear/PhilippinePesoIcon';
import Avatar from '@components/ui/Avatar';
import Drawer from '@components/ui/Drawer';
import EditProductForm from '../../forms/EditProductForm';
import { useUserStore } from '@stores/user.store';
import { createActivity } from '@features/admin/activities/services/activity.services';

interface IInventoryRow {
  product: ProductResponseType;
  index: number;
  gridTemplate: string;
}

const InventoryRow = ({
  product,
  index,
  gridTemplate,
}: IInventoryRow ) => {
   
  const user = useUserStore((state) => state.user)

  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false);
  const { status, color } = getStatusAndColor(product.productQuantity)
  
  const queryClient = useQueryClient()
  const isDrawerOpen = useDrawerStore((state) => state.drawerStates[product.productSku])
  const toggleDrawer = useDrawerStore((state) => state.toggleDrawer)
  const setSelectedProduct = useStocksStore((state) => state.setSelectedProduct)
  const mutation = useMutation({
    mutationFn: () => deleteProduct(product._id),
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      queryClient.invalidateQueries({queryKey: ['productTableData']});
      queryClient.invalidateQueries({ queryKey: ['stocksHeaderData'] });
      toast.custom(() => (
        <Toast title={product.productName} message="has been deleted" subtitle={product.productSku} status="success"/>
      ),{duration:5000});    }
  })

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenEdit = () => {
    toggleDrawer(product.productSku)
    setSelectedProduct(product)
  }

  const handleDelete = async () => {
    mutation.mutate()
    if (user.role === "assistant") {
      await createActivity({
        activityAssistantId: user._id,
        activityDescription: `Product ${product.productName} has been permanently removed.`,
        activityAction: "Delete",
      })
    }
  }

  return (
    <TableRow 
      index={index}
      key={index}
      gridTemplateColumns={gridTemplate}   
    >
      <Drawer
        activeSheets={[]}
        isOpen={isDrawerOpen}
        mainSheet={{
          name: `InventoryDrawer-${product.productSku}`,
          component: <EditProductForm />,
        }}
      />
      <DeleteModal 
        className="w-[32rem]"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Delete Product"
        message="This action cannot be undone. This will permanently delete your product from our servers."
        confirmation={`DELETE ${product.productName}`}
        handleSubmit={handleDelete}
        isLoading={mutation.isPending}
      />
      <TableData className="flex items-center gap-4">
        <Avatar
          name={product.productName}
          src={product.productAvatar}
        />
        <div
          className="flex flex-col items-start justify-start gap-1"
        >
          <span>{product.productName}</span>
          <span className="text-sm text-gray-500">#{product.productSku}</span>
        </div>
        {isNew(product.createdAt) && 
          <span className="flex shrink-0 uppercase text-xs px-2 py-1 rounded-full bg-red-50 text-red-500">NEW</span>
        }
      </TableData>
      <TableData className="flex items-center gap-2">
        <BankIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
        {product.vendorId.vendorCompanyName}
      </TableData>
      <TableData>
        <span
          className={`px-2 py-1 rounded-full text-xs uppercase
            ${product.productCategory === 'Medicine' && 'bg-sky-50 text-sky-500'}
            ${product.productCategory === 'Component' && 'bg-emerald-50 text-emerald-500'}
          `}
        >
          {product.productCategory}
        </span>
      </TableData>
      <TableData>{product.productQuantity}</TableData>
      <TableData className="flex items-center gap-2">
        <span 
          className="w-3 h-3 rounded-md"
          style={{ backgroundColor: color }}
        />
        <span 
          className="uppercase text-xs"
          style={{ color: color }}
        >
          {status}
        </span>
      </TableData> 
      
      <TableData>
        <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-900" />
        {(product.productQuantity * product.productUnitPrice).toLocaleString('en-US')}
      </TableData>
      <TableData
        className="flex items-center justify-end w-full h-full relative "
      >
        <button 
          ref={buttonRef}
          className=""
          onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
        >
          <ThreeDotsIcon className="w-5 h-5 stroke-2 stroke-gray-500 fill-gray-500 -rotate-90" />
        </button>
        <PopOver 
          anchorRef={buttonRef}
          isOpen={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}              
          className=" top-12 -right-0  py-2 flex flex-col h-fit"
          position='bottom'
        >
          <button 
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-gray-500 flex items-center gap-2"
            onClick={handleOpenEdit}
          >
            <EditIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
            Edit
          </button>
          <hr className="border-gray-200 my-1" />
          <button 
            onClick={()=>setIsDeleteModalOpen(true)}
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-sm text-start text-rose-500 flex items-center gap-2"
          >
            <DeleteIcon className="stroke-2 stroke-rose-500 w-4 h-4 " />
            Delete
          </button>
        </PopOver>
      </TableData>
    </TableRow>
  )
}

export default InventoryRow
