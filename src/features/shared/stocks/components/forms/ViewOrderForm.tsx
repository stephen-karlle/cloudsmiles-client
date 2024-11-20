import { useStocksStore } from "../../stores/stocks.store"
import { useDrawerStore } from "@stores/drawer.store"
import DrawerHeader from "@components/shared/DrawerHeader"
import DrawerFooter from "@components/shared/DrawerFooter"
import BankIcon from "@icons/linear/BankIcon"
import Avatar from "@components/ui/Avatar"
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon"
import NoteIcon from "@icons/linear/NoteIcon"

const gridTemplate = "grid-cols-[auto_20%_20%_20%]"
const header = [
  {
    title: 'PRODUCT NAME',
    sortable: true,
  },
  {
    title: 'PRICE',
    sortable: false,
  },
  {
    title: 'QUANTITY',
    sortable: true,
  },
  {
    title: 'TOTAL COST',
    sortable: true,
  },
]

const ViewOrderForm = () => {

  const selectedOrder = useStocksStore((state) => state.selectedOrder)
  const closeDrawer = useDrawerStore((state) => state.closeDrawer)
  const isLoading = useStocksStore((state) => state.isLoading)
  

  const notes = selectedOrder.orderNotes

  const handleClose = () => {
    closeDrawer()
  }

  const totalCost = selectedOrder.orderProducts.reduce((acc, product) => acc + (product.productReceived * product.productId.productUnitPrice), 0)


  
  return (
    <article
      className="w-full h-full flex flex-col"
    >  
      <DrawerHeader 
        title={`#${selectedOrder.orderSerialId}`}
        handleClose={handleClose}
        isLoading={isLoading}
      />
      <section className="w-full h-full overflow-y-scroll flex flex-col p-6 gap-4">
        <div className="rounded-md ring-1 ring-gray-200 bg-white flex flex-col items-center ">
          <div className="rounded-md p-4 flex items-center bg-white w-full">
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <BankIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                <h1 className="text-lg text-gray-700 font-medium">{selectedOrder.orderVendorId.vendorCompanyName}</h1>
              </div>
              <h1 className="text-sm text-gray-500">{selectedOrder.orderVendorId.vendorAddress}</h1>
            </div>
            <div className="flex flex-col w-full items-end">
              <h1 className="text-lg text-gray-700 font-medium">#{selectedOrder.orderSerialId}</h1>
              {/* <span className="bg-green-50 text-green-500 px-2 py-1 rounded-full uppercase text-xs">{selectedOrder.orderStatus}</span> */}
            </div>
          </div>
          {notes && (
            <div className="px-4 py-2 flex rounded-md items-center gap-1 bg-gray-50 border-t border-gray-200 w-full">
              <NoteIcon className="w-4 h-4 stroke-2 stroke-gray-500 flex-shrink-0" />
              <p className="text-sm text-gray-500">{notes}</p>
            </div>
          )}

        </div>
        <hr className="w-full border border-dashed border-gray-200 my-2" />
          <h1 className="text-lg text-gray-700 font-medium flex-shrink-0">Order Products</h1>

        <table className="flex flex-col gap-2">
          <thead className="px-1">
            <tr
              className={`grid py-2 px-4 h-fit w-full bg-gray-50 rounded-md ${gridTemplate}`}
            >
              {header.map((item, index) => (
                <td
                  key={index}
                  className=" w-full flex items-center justify-start gap-2 rounded-md uppercase text-right text-gray-500 text-sm font-normal"
                >
                  {item.title}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white h-full flex flex-col overflow-y-auto w-full p-1 gap-2 overflow-hidden">
            {selectedOrder.orderProducts.map((order, index) => {
              const receive = order.productReceived
              const price = order.productId.productUnitPrice
              return (
                <tr
                  className="flex flex-col gap-2 w-full py-2 border-b "
                  key={index}
                >
                  <td
                    className={`grid px-2 w-full items-center bg-white ${gridTemplate} `}
                  >
                    <div className="w-full flex items-center gap-2 ">
                      <Avatar 
                        name={order.productId.productName} 
                        src={order.productId.productAvatar}
                      />
                      <div className="w-full flex flex-col items-start font-normal px-1 overflow-hidden">
                        <label className="text-gray-700 text-md truncate max-w-full overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                          {order.productId.productName}
                        </label>
                        <label className="text-gray-500 text-sm truncate max-w-full overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                          #{order.productId.productSku}
                        </label>
                      </div>
                    </div>
                    <div className="w-full flex items-center ">
                      <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
                      <label className="text-gray-700 text-sm w-16">{price.toLocaleString('en-US')}</label>
                    </div>
                    <div className="w-full flex items-center gap-4">
                      <label className="text-gray-700 text-sm w-16">{receive}</label>
                    </div>
                    <div className="w-full flex items-center gap-4">
                      <label className="text-gray-700 text-sm w-16">{receive * order.productId.productUnitPrice}</label>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="w-full flex items-center justify-end gap-1 ">
          <h1 className="text-base  text-gray-500">Total Cost:</h1>
          <h1 className="text-lg font-medium text-gray-700 flex items-center justify-center">
            <PhilippinePesoIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
            {totalCost.toLocaleString('en-US')} 
          </h1>
        </div>
      </section>
      <DrawerFooter
        handleClose={handleClose}
        handleSubmit={() => {}}
        isLoading={isLoading}
        isFinal={true}
      />
    </article>
    )

}

export default ViewOrderForm