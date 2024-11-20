import StocksHeader from "../StocksHeader";
import OrderDataTable from "../table/order/OrderDataTable";


const OrderOutlet = () => {
  

  return (    
    <main className="h-full bg-white flex flex-col">
      <StocksHeader/>
      <section className="flex-grow overflow-y-hidden">
        <OrderDataTable />
      </section>
      
    </main>
  );
};

export default OrderOutlet;


