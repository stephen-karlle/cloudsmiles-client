import { useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from "@features/guest/authentication/login/services/login.services"
import { useUserStore } from "@stores/user.store"
import PopOver from "@components/ui/PopOver"
import BellIcon from "@icons/linear/BellIcon"
import ChevronIcon from "@icons/linear/ChevronIcon"
import DoorIcon from "@icons/linear/DoorIcon"
import GearIcon from "@icons/linear/GearIcon"
import Avatar from "@components/ui/Avatar"



const AdminNavbar = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const location = useLocation()
  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)

  
  const anchorRef = useRef(null)
  const [ isOpen, setOpen ] = useState<boolean>(false)

  const pageNames: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/calendar': 'Calendar',
    '/patient': 'Patients',
    '/staff': 'Staffs',
    '/treatment': 'Treatments',
    '/stocks': 'Stocks',
    '/knowledge': 'Knowledge',
    '/payment': 'Payment',
    '/vendors': 'Vendors',
    '/settings': 'Settings',
    '/activities': 'Activities',
  };

  const getPageName = (path: string): string => {
    if (path.startsWith('/patient/')) {
      return 'Patient Profile'; // Customize this as needed
    }
    return pageNames[path] || 'Unknown Page'; // Fallback
  };

  const activePage =  getPageName(location.pathname)

  const handleLogout = async () => {
    await logout()
    queryClient.refetchQueries({ queryKey: ['userRole']})
    clearUser()
    navigate('/login')
  }


  return (
    <nav className='p-6 w-full z-[70] h-20 flex items-center justify-between border-b border-gray-200 '>
      <div className="w-fit flex items-center justify-start">
        <h1 className="tracking-tight text-2xl font-medium text-gray-700">
          {activePage}
        </h1> 
      </div>
      <div className="flex items-center justify-end gap-4 w-[80%] h-full">
        <div className=" flex items-center justify-end gap-2 flex-shrink-0">
          <Avatar 
            name={user.fullName}
            src={user.avatar}
          />
          <div className=" flex flex-col items-start justify-start ">
            <p className="text-sm text-gray-700 font-medium">{user.fullName}</p>
            <p className="text-xs  font-medium text-lime-500 ">Administrator</p>
          </div>
          <div 
            className="relative cursor-pointer"
            ref={anchorRef}
            onClick={() => setOpen((prev) => !prev)}
          >
            <ChevronIcon className="ml-2 stroke-1 stroke-gray-500"/>
            <PopOver
              anchorRef={anchorRef}
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              position="bottom"
              className="w-36 right-0 top-8 py-2"
            >
              <button 
                className="w-full px-4 text-start text-gray-500 text-sm flex items-center gap-2 py-1"
                onClick={() => navigate('/settings')}
              >
                <GearIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
                Settings
              </button>
              <hr className="my-2 border-gray-200" />
              <button 
                className="w-full px-4 text-start text-rose-500 text-sm flex items-center gap-2"
                onClick={handleLogout}
              >
                <DoorIcon className="w-4 h-4 stroke-2 stroke-rose-500" />
                Logout
              </button>
            </PopOver>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
