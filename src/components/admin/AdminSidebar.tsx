import { useAdminStore } from "src/stores/admin/admin.store"
import { useLocation } from "react-router-dom"
import CalendarIcon from "@icons/linear/CalendarIcon"
import UsersIcon from "@icons/linear/UsersIcon"
import UserIcon from "@icons/linear/UserIcon"
import TreatmentIcon from "@icons/linear/TreatmentIcon"
import Logo from "/logo.svg"
import SideBarButton from "../shared/SideBarButton"
import BulbIcon from "@icons/linear/BulbIcon"
import MoneyIcon from "@icons/linear/MoneyIcon"
import BankIcon from "@icons/linear/BankIcon"
import GridIcon from "@icons/linear/Gridicon"
import BuildingIcon from "@icons/linear/BuildingIcon"
import BeakerIcon from "@icons/linear/BeakerIcon"
import ActivityIcon from "@icons/linear/ActivityIcon"


const AdminSidebar = () => {

  const location = useLocation()

  const pageNames: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/calendar': 'Calendar',
    '/patient': 'Patient',
    '/staff': 'Staff',
    '/treatment': 'Treatment',
    '/stocks': 'Stocks',
    '/knowledge': 'Knowledge',
    '/payment': 'Payment',
    '/vendors': 'Vendors',
    '/settings': 'Settings',
    '/activities': 'Activities',
  };

  const activePage = pageNames[location.pathname] || 'dashboard';

  const setActivePage = useAdminStore((state) => state.setActivePage)



  return (
    <aside className='w-[16rem] h-full flex flex-col items-start justify-start  flex-shrink-0 border-r border-gray-200'>
      {/* Branding */}
      <section className=" flex gap-2 items-center justify-start w-full px-6 border-b border-gray-200 h-20 flex-shrink-0 p-6">
        <div className="w-7 h-7 rounded-md">
          <img src={Logo} alt="VS Dental Logo" className="w-full h-full" />
        </div>
        <h1 className="text-xl font-medium text-lime-500 break-keep tracking-wide">VS
          <span className="text-green-950 tracking-wide">Dental</span>
        </h1>

      </section>
      {/* <hr className="border-1 border-gray-200 w-full bottom-0"/> */}
      <section className="p-6 flex flex-col items-start justify-start gap-4 w-full flex-1">
        {/* Location */}
        <div className="mb-2 ring-1 ring-gray-200 w-full rounded-md py-2 px-4 flex items-center justify-start gap-2 ">
          <BuildingIcon className="w-6 h-6 stroke-1 stroke-gray-700"/>
          <div>
            <p className="text-sm text-gray-700 font-medium">Dolores Clinic</p>
            <p className="text-xs text-gray-500">San Fernando, Pampanga</p>
          </div>
        </div> 
        {/* Overview */}
        <div className="w-full flex flex-col items-start justify-start">
          <SideBarButton icon={<GridIcon />} name="Dashboard" activePage={activePage} setActivePage={setActivePage}/>
        </div>
        {/* Clinic */}
        <div className="w-full flex flex-col items-start justify-start mt-2">
          <label className="text-xs font-medium tracking-widest text-gray-500 mb-1 ">CLINIC</label>
          <SideBarButton icon={<CalendarIcon />} name="Calendar" activePage={activePage} setActivePage={setActivePage}/>
          <SideBarButton icon={<UserIcon />} name="Patient" activePage={activePage} setActivePage={setActivePage}/>
          <SideBarButton icon={<UsersIcon />} name="Staff" activePage={activePage} setActivePage={setActivePage}/>
          <SideBarButton icon={<TreatmentIcon />} name="Treatment" activePage={activePage} setActivePage={setActivePage}/>

        </div>
        {/* Finance */}
        <div className="w-full flex flex-col items-start justify-start mt-2">
          <label className="text-xs font-medium tracking-widest text-gray-500 mb-1 ">FINANCE</label>
          <SideBarButton icon={<MoneyIcon />} name="Payment" activePage={activePage} setActivePage={setActivePage}/>
          <SideBarButton icon={<BeakerIcon />} name="Stocks" activePage={activePage} setActivePage={setActivePage}/>
          <SideBarButton icon={<BankIcon />} name="Vendors" activePage={activePage} setActivePage={setActivePage}/>
        </div>
      
        {/* Audit Trail  */}
        <div className="w-full flex flex-col items-start justify-start mt-2">
          <label className="text-xs font-medium tracking-widest text-gray-500 mb-1 ">AUDIT TRAIL</label>
          <SideBarButton icon={<ActivityIcon />} name="Activities" activePage={activePage} setActivePage={setActivePage}/>
        </div>

        {/* Chatbot */}
        <div className="w-full flex flex-col items-start justify-start mt-2">
          <label className="text-xs font-medium tracking-widest text-gray-500 mb-1 ">CHATBOT</label>
          <SideBarButton icon={<BulbIcon />} name="Knowledge" activePage={activePage} setActivePage={setActivePage}/>
        </div>

      </section>
      <section className="p-6 flex flex-col items-start justify-start gap-1 w-full">
        <label className="text-xs font-medium tracking-wider text-gray-500">POWERED BY</label>
        <p className="text-gray-500 font-medium text-base">Cloud
          <span className="text-lime-500 font-bold">Smiles</span>
        </p>
      </section>
    </aside>
  )
}

export default AdminSidebar
