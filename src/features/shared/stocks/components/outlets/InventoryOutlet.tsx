
import StocksHeader from "../StocksHeader";
import InventoryDataTable from '../table/inventory/InventoryDataTable';



const InventoryOutlet = () => {


  return (    
    <main className="h-full bg-white flex flex-col">
      <StocksHeader/>
      <section className="flex-grow overflow-y-hidden">
        <InventoryDataTable />
      </section>
    </main>
  );
};

export default InventoryOutlet;
