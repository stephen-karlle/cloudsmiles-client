import { ILinkButton } from '../../features/shared/stocks/types/header.types'

const LinkButton = ({ isActive, onClick, children }: ILinkButton) => {

  const baseStyle = " relative w-fit h-10 transition-all duration-300 ease-in-out outline-offset-4 flex items-center justify-start gap-1 text-center  py-2 flex items-center justify-center";
  return (
    <button 
      onClick={onClick}
      className={ ` font-medium ${baseStyle} ${isActive ? " text-gray-700" : " text-gray-500"}`}
    >
      {children}
      {isActive && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-lime-500 rounded-full" />}
    </button>
  )
}

export default LinkButton
