import { FormProvider } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useCalendarStore } from '../../stores/calendar.stores';
import { cancelBill } from "@features/shared/payments/services/payment.services";
import { getSelectedPaymentMethod } from "@features/shared/payments/constants/payment.constants";
import { useDayDentist } from '../../services/state/useDayDentist';
import { useAdminStore } from "@stores/admin/admin.store";
import { useWeekDentist } from '../../services/state/useWeekDentist';
import { useViewAppointmentStore, usePaymentAppointmentStore} from '../../stores/appointment.stores';
import { generateDayGridCol, generateMonthGridCol, generateWeekGridCol } from '../../utils/calendar.utils';
import { Fragment } from "react/jsx-runtime";
import { useMonthlyDentist } from "../../services/state/useMonthlyDentist";
import CalendarHeader from '../CalendarHeader';
import DaySubHeader from '../scheduler/subheaders/DaySubHeader'
import TimeColumns from '../scheduler/columns/TimeColumns'
import DayColumns from '../scheduler/columns/DayColumns'
import WeekColumns from '../scheduler/columns/WeekColumns';
import WeekSubHeader from '../scheduler/subheaders/WeekSubHeader';
import useViewAppointment from "@features/shared/calendar/hooks/useViewAppointment";
import usePayAppointment from "@features/shared/calendar/hooks/usePayAppointment";
import Drawer from "@components/ui/Drawer";
import DeleteModal from "@components/ui/DeleteModal";
import MonthlySubHeader from "../scheduler/subheaders/MonthlySubHeader";
import MonthColumns from "../scheduler/columns/MonthColumns";




const CalendarOutlet = () => {
  const queryClient = useQueryClient();
  const { data: dayDentists } = useDayDentist()
  const { data: weekDentists } = useWeekDentist()
  const { data: monthlyDentists} = useMonthlyDentist()
  const gridColWidth = useCalendarStore((state) => state.gridColWidth)
  const activeView = useCalendarStore((state) => state.activeView)
  const gridColsStyle =  activeView === "Day" ? generateDayGridCol(dayDentists, gridColWidth) :  activeView === "Week" ? generateWeekGridCol(weekDentists, gridColWidth / 2) : generateMonthGridCol(monthlyDentists, gridColWidth / 2);
  const viewMainSheet = useViewAppointmentStore((state) => state.viewMainSheet);
  const isViewDrawerOpen = useViewAppointmentStore((state) => state.isViewDrawerOpen);
  const viewActiveSheets = useViewAppointmentStore((state) => state.viewActiveSheets);
  const selectedAppointment = useViewAppointmentStore((state) => state.selectedAppointment);

  const paymentMainSheet = usePaymentAppointmentStore((state) => state.paymentMainSheet);
  const isPaymentDrawerOpen = usePaymentAppointmentStore((state) => state.isPaymentDrawerOpen);
  const paymentActiveSheets = usePaymentAppointmentStore((state) => state.paymentActiveSheets);
  const cardStates = usePaymentAppointmentStore((state) => state.cardStates);
  const isPaymentModalOpen = usePaymentAppointmentStore((state) => state.isPaymentModalOpen);
  const setPaymentModalOpen = usePaymentAppointmentStore((state) => state.setPaymentModalOpen);
  const clearPaymentSteps = usePaymentAppointmentStore((state) => state.clearPaymentSteps);
  const setIsLoading = usePaymentAppointmentStore((state) => state.setIsLoading);
  const isLoading = usePaymentAppointmentStore((state) => state.isLoading);

  const activeSheets = useAdminStore((state) => state.activeSheets);
  const isDrawerOpen = useAdminStore((state) => state.isDrawerOpen);
  const mainSheet = useAdminStore((state) => state.mainSheet);

  const viewMethods = useViewAppointment();
  const payMethods = usePayAppointment();

  const appointment = selectedAppointment.appointmentData

  const handleCancelPayment = async () => {
    const selectedPaymentMethod = getSelectedPaymentMethod(cardStates);
    setIsLoading(true);
    try {
      await cancelBill(appointment._id ,selectedPaymentMethod);
      queryClient.invalidateQueries({queryKey: ['appointmentPaymentQrCode']});
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setPaymentModalOpen(false);
    clearPaymentSteps();
  }
  
  return (    
    <main className="h-full bg-white flex flex-col items ">
      <Drawer 
        mainSheet={mainSheet}
        isOpen={isDrawerOpen}
        activeSheets={activeSheets}
      />
      <DeleteModal
        isOpen={isPaymentModalOpen}
        setIsOpen={setPaymentModalOpen}
        title="Cancel Payment"
        message="Are you sure you want to cancel this payment? The payment will be deleted permanently from the system."
        confirmation="I understand the consequences"
        handleSubmit={handleCancelPayment}
        deleteMessage="CANCEL"
        isLoading={isLoading}
      />
     <FormProvider {...viewMethods}>
        <form
          onSubmit={viewMethods.handleSubmit(viewMethods.onSubmit)}
          className="w-[0px] h-[0px] "
        >        
          <Drawer 
            mainSheet={viewMainSheet}
            isOpen={isViewDrawerOpen}
            activeSheets={viewActiveSheets}
          />
        </form>        
      </FormProvider>
      
      <FormProvider {...payMethods}>
        <form
          onSubmit={payMethods.handleSubmit(payMethods.onSubmit)}
          className="w-[0px] h-[0px] "
        >        
          <Drawer 
            mainSheet={paymentMainSheet}
            isOpen={isPaymentDrawerOpen}
            activeSheets={paymentActiveSheets}
          />
        </form>        
      </FormProvider>


      <CalendarHeader />
      <article className="flex-grow overflow-y-auto overflow-x-scroll h-full w-full">
        {activeView === "Day" && <DaySubHeader />}
        {activeView === "Week" && <WeekSubHeader />}
        {activeView === "Month" && <MonthlySubHeader />}
        <section className="flex relative">
          <div 
            className={`relative h-full grid `} 
            style={{gridTemplateColumns: gridColsStyle}} 
          >
            {activeView === "Day" && (
              <Fragment>
                <TimeColumns />
                <DayColumns />
              </Fragment>
              )
            }
            {
              activeView === "Week" && (
                <Fragment>
                  <TimeColumns />
                  <WeekColumns />
                </Fragment>
              )
            }
            {activeView === "Month" &&  <MonthColumns />  
            }
          </div>
        </section>
      </article>
    </main>
  );
};

export default CalendarOutlet;