import { cloneElement, ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom';


interface ISideBarButton {
  icon: ReactNode
  name: string;
  activePage: string;
  setActivePage: (newActivePage: string) => void
}

const SideBarButton = ({icon, name, activePage, setActivePage} : ISideBarButton ) => {

  const isActive = activePage === name

  return (
    <Link 
      to={`/${name.toLowerCase()}`}
      onClick={()=>setActivePage(name)}
      className={`flex items-center justify-start gap-2 py-2 w-full rounded-md
       `}
    >
      {cloneElement(icon as ReactElement, {
        className: `stroke-2 w-5 h-5 ${isActive ? " stroke-lime-500 " : " stroke-gray-500 "}`
      })}      
      <p className={`${isActive ? " text-gray-700 ": " text-gray-500 "}  font-medium text-base`}>{name}</p>
    </Link>
  )
}

export default SideBarButton
