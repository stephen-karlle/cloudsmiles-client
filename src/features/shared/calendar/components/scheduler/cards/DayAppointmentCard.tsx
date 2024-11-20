import { MouseEvent } from 'react';
import { 
  Rnd, 
  RndDragCallback, 
  RndResizeCallback, 
  RndResizeStartCallback
} from 'react-rnd'
import { generateDayTimeSlots, removeDateOffset, addDateOffset, } from '../../../utils/calendar.utils';
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { IAppointmentResponse, IUpdateAppointmentSizeRequest, IUpdateAppointmentPositionRequest } from '@features/shared/calendar/types/appointment.types';
import { updateAppointmentPosition, updateAppointmentSize } from '@features/shared/calendar/services/calendar.services';
import { useDayDentist } from '@features/shared/calendar/services/state/useDayDentist';
import { useMutation } from '@tanstack/react-query';
import { useViewAppointmentStore } from '@features/shared/calendar/stores/appointment.stores';
import { toast } from 'sonner';
import ViewAppointmentForm from '../../forms/ViewAppointmentForm';
import Toast from '@components/ui/Toast';
import DayAppointmentWidget from '@components/shared/calendar/DayAppointmentWidget';

export interface IAppointmentCard {
  index: number;
  positionX: number;
  positionY: number;
  size: number;
  appointment: IAppointmentResponse;
}


const DayAppointmentCard = ({
  index,
  positionX,
  positionY,
  size,
  appointment,
}: IAppointmentCard) => {
  

  const { data: dentists} = useDayDentist()
  const appointments = useCalendarStore((state) => state.appointments);
  const updateAppointments = useCalendarStore((state) => state.updateAppointments)
  const openingTime = useCalendarStore((state) => state.openingTime);
  const closingTime = useCalendarStore((state) => state.closingTime);
  const timeSlots = useCalendarStore((state) => state.timeSlots);
  const updateTimeSlots = useCalendarStore((state) => state.updateTimeSlots);
  const gridColWidth = useCalendarStore((state) => state.gridColWidth);

  const setSelectedAppointment = useViewAppointmentStore((state) => state.setSelectedAppointment)
  const setViewDrawerOpen = useViewAppointmentStore((state) => state.setViewDrawerOpen)
  const setViewMainSheet = useViewAppointmentStore((state) => state.setViewMainSheet)

  const setSelectedAppointmentStatus = useViewAppointmentStore((state) => state.setSelectedAppointmentStatus)

  const sizeMutation = useMutation({
    mutationFn: async (data: IUpdateAppointmentSizeRequest) => {
      const response: IAppointmentResponse = await updateAppointmentSize(data);
      return response; 
    }, 
  });

  const positionMutation = useMutation({
    mutationFn: async (data: IUpdateAppointmentPositionRequest) => {
      const response: IAppointmentResponse = await updateAppointmentPosition(data);
      return response; 
    }, 
  });

  const warn = () => {
    toast.custom(() => (
      <Toast
        title="Oops, something went wrong"
        message="" 
        subtitle="Appointment can't be moved to this time"
        status="error"
      />
    ),{duration:5000});    
  }
  
  const handleOnDragStart = (start: Date, end: Date, x: number): RndDragCallback =>{
    if (!dentists || !appointments) return () => {};
    return () => {
      const dentistIndex = Math.floor((x - 96) / gridColWidth);
      const oldTimeSlots = generateDayTimeSlots(start, end, dentists[dentistIndex]._id)
      updateTimeSlots((prevTimeSlots )=> {
        return prevTimeSlots.filter(slot => {
          // Check if the slot is not in oldTimeSlots
          return !oldTimeSlots.some(oldSlot => 
            oldSlot.time === slot.time && oldSlot.id === slot.id
          );
        });
      });
    }
  }

  const handleOnDragStop = ( start:Date, end:Date, index: number, dentistId: string ): RndDragCallback => { 

    

    if (!dentists || !appointments) return () => {};
    return (_, d) => {
      // console.log("Start ", start)
      // console.log("End ", end)
      
      const addOldTimeSlots = () => {
        const oldTimeSlots = generateDayTimeSlots(start, end, dentistId);
        updateTimeSlots(prev => [...prev, ...oldTimeSlots]);
      };

      if (d.x < 0 || d.x > (dentists.length * 500) + 96 ) {
        addOldTimeSlots();
        warn()
        return
      }


      if (d.y < 0 || d.y > (((closingTime - openingTime ))* 4 * 30 - 1 )) {
        addOldTimeSlots();
        warn()
        return
      }

      const appointment = appointments[index];
      const differenceInMilliseconds = removeDateOffset(appointment.appointmentData.appointmentDate.end).getTime() - removeDateOffset(appointment.appointmentData.appointmentDate.start).getTime();
      const differenceInMinutes = differenceInMilliseconds / 1000 / 60;
  
      const startTime = new Date(appointment.appointmentData.appointmentDate.start);
      startTime.setHours(openingTime);
      startTime.setMinutes(0 + d.y / 2);
  
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + differenceInMinutes);
  
      startTime.setFullYear(start.getFullYear(), start.getMonth(), start.getDate());
      endTime.setFullYear(start.getFullYear(), start.getMonth(), start.getDate());
  
      const dentistIndex = Math.floor((d.x - 96) / gridColWidth);
      const newTimeSlots = generateDayTimeSlots(startTime, endTime, dentists[dentistIndex]._id);
  
     

      const existsInTimeSlots = newTimeSlots.some(newSlot => 
        timeSlots.find(slot => slot.time === newSlot.time && slot.id === newSlot.id)
      );

      if(existsInTimeSlots){
        addOldTimeSlots();
        warn()
        return
      }
      
      if (endTime.getHours() > closingTime || (endTime.getHours() === closingTime && endTime.getMinutes() > 0)) {
        addOldTimeSlots();
        warn()
        return;
      }


      const newData: IUpdateAppointmentPositionRequest = {
        _id: appointment.appointmentData._id,
        appointmentDentistId: dentists[dentistIndex]._id,
        appointmentTime: {
          start: addDateOffset(startTime),
          end: addDateOffset(endTime),
        }
      }

      positionMutation.mutate(newData);


      updateTimeSlots((prevTimeSlots) => {
        const updatedTimeSlots = prevTimeSlots.filter(
          (slot) => !newTimeSlots.some((newSlot) => newSlot.time === slot.time && newSlot.id === slot.id)
        );
        return [...updatedTimeSlots, ...newTimeSlots];
      });
  


      const newAppointmentPosition: IAppointmentResponse = {
        ...appointment,
        appointmentData: {
          ...appointment.appointmentData,
          appointmentDate: {
            start: addDateOffset(startTime),
            end: addDateOffset(endTime),
          },
        },
        dentistData: dentists[dentistIndex]
      };



      updateAppointments((prevAppointments) => {
        const newAppointments = prevAppointments.map((prevAppointment, i) => {
          if (i === index) {
            return newAppointmentPosition;
          }
          return prevAppointment;
        });
        return newAppointments
      });

    };  
  };

  const handleOnResizeStart = (start: Date, end: Date, x: number): RndResizeStartCallback =>{
    if (!dentists || !appointments) return () => {};
    return () => {
      const dentistIndex = Math.floor((x - 96) / gridColWidth);
      const oldTimeSlots = generateDayTimeSlots(start, end, dentists[dentistIndex]._id)
      updateTimeSlots(prevTimeSlots => {
        return prevTimeSlots.filter(slot => {
          // Check if the slot is not in oldTimeSlots
          return !oldTimeSlots.some(oldSlot => 
            oldSlot.time === slot.time && oldSlot.id === slot.id
          );
        });
      });
    }
  }

  const handleOnResizeStop = ( startTime:Date, endTime: Date, x:number, index: number):RndResizeCallback => {
    if (!dentists || !appointments) return () => {};
    return (_, __, ___, d) => {
      const totalMinutes = d.height / 2 
      const newTime = new Date(endTime) 
      newTime.setMinutes(newTime.getMinutes() + totalMinutes);
      
      const dentistIndex = Math.floor((x - 96) / gridColWidth);
      const newTimeSlots = generateDayTimeSlots(startTime, newTime, dentists[dentistIndex]._id)
      const existsInTimeSlots = newTimeSlots.some(newSlot => 
        timeSlots.find(slot => slot.time === newSlot.time && slot.id === newSlot.id)
      );

      if(existsInTimeSlots) {
        warn()
        return null
      }

      if (newTime.getHours() > closingTime || (newTime.getHours() === closingTime && newTime.getMinutes() > 0)) {
        warn()
        return  null
      }
      
      const newData: IUpdateAppointmentSizeRequest = {
        _id: appointment.appointmentData._id,
        appointmentTime: {
          start: addDateOffset(startTime),
          end: addDateOffset(newTime),
        }
      }
      

      sizeMutation.mutate(newData);

      updateTimeSlots((prevTimeSlots) => {
        const updatedTimeSlots = prevTimeSlots.filter(
          (slot) => !newTimeSlots.some((newSlot) => newSlot.time === slot.time && newSlot.id === slot.id)
        );
        return [...updatedTimeSlots, ...newTimeSlots];
      });

      const newAppointmentSize: IAppointmentResponse  = {
        ...appointment,
        appointmentData: {
          ...appointment.appointmentData,
          appointmentDate: {
            start: addDateOffset(startTime),
            end: addDateOffset(newTime),
          }
        }
      };
      

      updateAppointments((prevAppointments) => {
        const newAppointments = prevAppointments.map((prevAppointment, i) => {
          if (i === index) {
            return newAppointmentSize;
          }
          return prevAppointment;
        });
        return newAppointments
      });

    };
  };

  const handleOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setViewDrawerOpen(true);
    setSelectedAppointmentStatus(appointment.appointmentData.appointmentStatus);
    setViewMainSheet({name: "MainSheet", component: <ViewAppointmentForm />})
  }

  const start = removeDateOffset(appointment.appointmentData.appointmentDate.start);
  const end = removeDateOffset(appointment.appointmentData.appointmentDate.end);
  const status = appointment.appointmentData.appointmentStatus;


  // For sizes purposes
  const startTime = start.getTime();
  const endTime = end.getTime();
  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  const isOnlyOneSlot = endTime === startTime + fifteenMinutesInMilliseconds;

  const isFinished = status === "Finished" 

  const isDisabled = status === "Cancelled" || isFinished

  return (
    <Rnd
      size={{ width: `${gridColWidth}px`, height: `${ size * 30 }px` }}
      position={{ x: positionX , y: positionY}}
      dragGrid={[gridColWidth, 30]}
      resizeGrid={[gridColWidth, 30]}
      className={` absolute z-20  rounded-lg ${isOnlyOneSlot ? " px-2 " : " px-2 pb-2 "} `}
      onDragStart={handleOnDragStart(start, end, positionX)}
      onResizeStart={handleOnResizeStart(start, end, positionX)}
      onDragStop={handleOnDragStop(start, end, index, appointment.dentistData._id)}              
      onResizeStop={handleOnResizeStop(start, end, positionX, index)}
      minHeight={30}
      disableDragging={status === "Cancelled" || status === "Finished"}
      children={
        <DayAppointmentWidget 
          fullName={appointment.patientData.patientFullName}
          status={status}
          start={start}
          end={end}
          handleOpen={handleOpen}
          type='day'
        />
      }
      enableResizing={{
        bottom: isDisabled ? false : true
      }}
      resizeHandleComponent={
        {bottom: 
          <div className="w-full h-2 relative flex items-center justify-center">
            <div  className={`w-2 h-2 rounded-full bg-rose-500 absolute z-[${20 - index}]`}/>
          </div>
        }
      }
    >

    </Rnd>
  )
}

export default DayAppointmentCard