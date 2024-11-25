import { useState } from "react";
import StocksHeader from "../StocksHeader";
import OrderDataTable from "../table/order/OrderDataTable";


const OrderOutlet = () => {
  
  const [ searchValue, setSearchValue ] = useState<string>('')

  return (    
    <main className="h-full bg-white flex flex-col">
      <StocksHeader onChange={setSearchValue}/>
      <section className="flex-grow overflow-y-hidden">
        <OrderDataTable searchValue={searchValue} />
      </section>
      
    </main>
  );
};

export default OrderOutlet;


