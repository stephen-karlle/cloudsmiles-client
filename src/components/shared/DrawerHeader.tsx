import CloseIcon from '@icons/linear/CloseIcon'

interface IDrawerHeader {
  title: string;
  handleClose: () => void;
  isLoading?: boolean;
}

const DrawerHeader = ({
  title,
  handleClose,
  isLoading = false
}: IDrawerHeader ) => {
  return (
    <section className="flex justify-between border-b border-gray-200 px-6 py-4">
      <h1 className="text-xl font-medium text-gray-700">{title}</h1>
      <button 
        className="w-8 h-8" 
        onClick={handleClose} 
        type="button"
        disabled={isLoading}
      >
        <CloseIcon className="stroke-1 stroke-gray-500 w-full h-full" />
      </button> 
    </section>
  )
}

export default DrawerHeader
