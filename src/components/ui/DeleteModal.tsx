import Button from './Button'
import Backdrop from './Backdrop'
import CloseIcon from '@icons/linear/CloseIcon'
import Input from './Input'
import { useState } from 'react';
import DeleteIcon from '@icons/linear/DeleteIcon';

interface IDeleteModal {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  message: string;
  confirmation: string;
  deleteMessage?: string;
  handleSubmit: () => void;
  isLoading: boolean
}

const DeleteModal = ({
  className,
  isOpen,
  setIsOpen,
  title,
  message,
  confirmation,
  deleteMessage,
  handleSubmit,
  isLoading ,
}: IDeleteModal) => {
  const [ value, setValue ] = useState<string>('')

  const baseStyle = "rounded-lg ring-1 ring-gray-200 bg-white p-6 flex flex-col gap-2 max-w-[32rem] "

  return (
    <Backdrop
      isOpen={isOpen}
      onClose={()=>setIsOpen(false)}
      zIndex={500}
    >
      <section
        className={`${baseStyle} ${className}`}
        onClick={(e)=> e.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-700">{title}</h1>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full "
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon className="w-6 h-6 stroke-2 stroke-gray-700" />
          </button>
        </header>

        <main className="flex flex-col gap-4">
          <p className="text-gray-500 text-base ">{message} Type 
            <span className="font-medium text-rose-500"> {confirmation} </span>
            to confirm your action.</p>
          <Input 
            className="w-full"
            onChange={(e)=>setValue(e.target.value)}
            maxLength={confirmation.length}
            variant='red'
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button 
              variant="secondary"
              onClick={()=>setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex items-center gap-2"
              variant={value !== confirmation || isLoading ? "disabled" : "danger"}
              onClick={() => {
                handleSubmit()
                setValue('')
              }}
              disabled={value !== confirmation}
            >
              { isLoading ? "Loading..." : (
                <>
                  <DeleteIcon className="w-5 h-5 stroke-2 stroke-white " />
                  {deleteMessage ? deleteMessage : "Delete"}
                </>
              )}
            </Button>
          </div>
        </main>
      </section>
    </Backdrop>
  )
}

export default DeleteModal
