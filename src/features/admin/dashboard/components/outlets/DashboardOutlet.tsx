import { formatDate } from '@features/shared/calendar/utils/calendar.utils';
import AppointmentCard from '../cards/AppointmentCard';
import StocksCard from '../cards/StocksCard';
import VisitCard from '../cards/VisitCard';
import TreatmentCard from '../cards/TreatmentCard';
import PatientCard from '../cards/PatientCard';
import PaymentCard from '../cards/PaymentCard';

const DashboardOutlet = () => {

  const account = {
    accountFullName: "John Doe",
  }


  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else if (currentHour < 22) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };


  return (
    <main className="grid grid-rows-[8%_auto] w-full h-full p-6 overflow-y-scroll overflow-x-hidden min-w-[1080px] " >
      <header className="flex flex-col items-start pb-4">
        <h1 className="text-xl font-medium text-gray-700 ">{`${getGreeting()}, ${account.accountFullName}!`}</h1>
        <p className="text-base text-gray-500">{formatDate(new Date())}</p>
      </header>
      <article className="grid grid-cols-[auto_27%] w-full h-full" >
        <section className=" grid grid-rows-2 ">
          <VisitCard />
          <div className="grid grid-cols-[auto_40%] h-full pt-6" >
            <PaymentCard />
            <div className="w-full h-full pl-6 grid grid-rows-2 gap-6">
              <PatientCard />
              <TreatmentCard /> 
            </div>
          </div>
        </section>
        <section className=" flex flex-col pl-6">
          <AppointmentCard />
          <StocksCard />
        </section>
      </article>
    </main>  
  )
}

export default DashboardOutlet