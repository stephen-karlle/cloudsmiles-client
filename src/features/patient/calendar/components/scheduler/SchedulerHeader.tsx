import Button from '@components/ui/Button'
import CalendarDatePicker from '@features/shared/calendar/components/scheduler/inputs/CalendarDatePicker'
import CalendarIcon from '@icons/linear/CalendarIcon'
import ChevronIcon from '@icons/linear/ChevronIcon'
import PlusIcon from '@icons/linear/PlusIcon'

type SchedulerHeaderProps = {
  date: Date,
  setDate: (date: Date) => void,
  appointmentCount: number
}


const SchedulerHeader = ({
  date,
  setDate,
  appointmentCount
}: SchedulerHeaderProps) => {



  const handlePreviousDate = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    setDate(newDate);
  }

  const handleNextDate = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    setDate(newDate);
  }

  const handleToday = () => {
    setDate(new Date())
  }




  return (
    <article className="sticky top-0 h-20 z-[60] w-full flex items-center justify-between gap-2 p-6 bg-white border-b border-ring-200">
      <section className="flex items-center justify-start gap-4">
        <div className="ring-1 h-8 w-8 ring-gray-200 flex-shrink-0 p-1 bg-white rounded-md">
          <CalendarIcon className=" stroke-1 stroke-gray-500 w-full h-full" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <h1 className="text-green-950 text-xl tracking-tight font-bold ">{appointmentCount}</h1>
          <p className="text-gray-500 text-sm">Total appointments</p>
        </div>
      </section>
      <section className="w-fit flex items-center justify-between gap-4 ">
        <button className="text-gray-950 ring-1 rounded-md ring-gray-200 p-1" onClick={handlePreviousDate}>
          <ChevronIcon className="stroke-2 stroke-gray-500 rotate-90"/>
        </button>
        <CalendarDatePicker 
          value={date} 
          setValue={setDate}
          type="date"
          className="w-64"
          placeholder="date" 
        />
        <button className="text-gray-950 rotate-90 ring-1 rounded-md ring-gray-300 p-1" onClick={handleNextDate}>
          <ChevronIcon className="stroke-2 stroke-gray-500 rotate-180"/>
        </button>
        <button className="text-base text-gray-700 ring-1 ring-gray-200 rounded-md px-4 py-1" onClick={handleToday}>Today</button>
      </section>

      <section className="w-fit flex items-center justify-end gap-4 ">
        <Button 
          variant="primary"
        >
          <PlusIcon className="stroke-2 stroke-white whitespace-nowrap" />
           Create Appointment
        </Button>
      </section>
      
    </article>
  )
}

export default SchedulerHeader