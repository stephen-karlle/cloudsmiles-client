
import { useState } from "react";
import StocksHeader from "../StocksHeader";
import InventoryDataTable from '../table/inventory/InventoryDataTable';



const InventoryOutlet = () => {

  const [ searchValue, setSearchValue ] = useState<string>('')

  return (    
    <main className="h-full bg-white flex flex-col">
      <StocksHeader onChange={setSearchValue}/>
      <section className="flex-grow overflow-y-hidden">
        <InventoryDataTable searchValue={searchValue} />
      </section>
    </main>
  );
};

export default InventoryOutlet;
