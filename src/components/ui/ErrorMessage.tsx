import AlertTriangleIcon from '@icons/bold/AlertTriangleIcon'

interface IErrorMessage {
  message: any
}

const ErrorMessage = ({ message }: IErrorMessage ) => {
  
  return (
    <div className={` flex items-center justify-start transition-all duration-400 ease-out ${message ? "h-6 " : " h-0"} `}>
      {message && 
        <div className="flex items-center justify-start gap-1 mt-2 w-full ">
          <AlertTriangleIcon className="w-4 h- mt-1"/>
          <p className="text-sm text-rose-500">{message}</p>
        </div>
      } 
    </div>  
  )
}

export default ErrorMessage