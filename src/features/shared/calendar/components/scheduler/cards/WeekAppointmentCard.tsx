import { 
  Rnd,
  RndDragCallback,
  RndResizeCallback,
  RndResizeStartCallback, 
} from 'react-rnd'
import { 
  IAppointmentResponse, 
  IUpdateAppointmentPositionRequest, 
  IUpdateAppointmentSizeRequest
} from '@features/shared/calendar/types/appointment.types';
import { 
  updateAppointmentPosition, 
  updateAppointmentSize 
} from '@features/shared/calendar/services/calendar.services';
import { 
  addDateOffset, 
  generateDateForDay, 
  generateDayTimeSlots, 
  removeDateOffset
} from '@features/shared/calendar/utils/calendar.utils';
import { useViewAppointmentStore } from '@features/shared/calendar/stores/appointment.stores';
import { useCalendarStore } from '@features/shared/calendar/stores/calendar.stores';
import { useWeekDentist } from '@features/shared/calendar/services/state/useWeekDentist';
import { useMutation } from '@tanstack/react-query';
import { MouseEvent } from 'react';
import { toast } from 'sonner';
import Toast from '@components/ui/Toast';
import AppointmentCard from '@components/shared/calendar/DayAppointmentWidget';
import ViewAppointmentForm from '../../forms/ViewAppointmentForm';

export interface IAppointmentCard {
  index: number;
  positionX: number;
  positionY: number;
  size: number;
  appointment: IAppointmentResponse;
}


const WeekAppointmentCard = ({
  index,
  positionX,
  positionY,
  size,
  appointment,
}: IAppointmentCard) => {
  


  const date = useCalendarStore((state) => state.date);
  const gridColWidth = 250
  const { data: dentists} = useWeekDentist()
  const appointments = useCalendarStore((state) => state.appointments);
  const updateAppointments = useCalendarStore((state) => state.updateAppointments);
  const updateTimeSlots = useCalendarStore((state) => state.updateTimeSlots);
  const timeSlots = useCalendarStore((state) => state.timeSlots);

  const openingTime = useCalendarStore((state) => state.openingTime);
  const closingTime = useCalendarStore((state) => state.closingTime);


  const setSelectedAppointment = useViewAppointmentStore((state) => state.setSelectedAppointment)
  const setViewDrawerOpen = useViewAppointmentStore((state) => state.setViewDrawerOpen)
  const setViewMainSheet = useViewAppointmentStore((state) => state.setViewMainSheet)

  const setSelectedAppointmentStatus = useViewAppointmentStore((state) => state.setSelectedAppointmentStatus)

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

  const sizeMutation = useMutation({
    mutationFn: async (data: IUpdateAppointmentSizeRequest, ) => {
      // Update the appointment size in the state
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
  

  const handleOnDragStart = (start: Date, end: Date): RndDragCallback =>{
    if (!dentists || !appointments) return () => {};
    return () => {
      const dentistId = appointment.dentistData._id;
      const oldTimeSlots = generateDayTimeSlots(start, end, dentistId)
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

  const handleOnDragStop = ( start:Date, end:Date, index: number, oldDentistId: string): RndDragCallback => { 
  
    if (!dentists || !appointments) return () => {};
    
    return (_, d) => {
      
      const schedules = dentists.map(dentist => {
        if (dentist.dentistSchedule) {
          return dentist.dentistSchedule;
        }
        return [];
      }).flat();



      const addOldTimeSlots = () => {
        const oldTimeSlots = generateDayTimeSlots(start, end, oldDentistId );
        updateTimeSlots(prev => [...prev, ...oldTimeSlots]);
      };


      if (d.x < 0 || d.x > ((schedules.length -1 ) * 250) + 96 ) {
        addOldTimeSlots();
        warn()
        return
      }

      if (d.y < 0 || d.y > ((closingTime - openingTime) * 4 * 30)) {
        addOldTimeSlots();
        warn()
        return;
      }
      
      const appointment = appointments[index];
      const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      const allDentistSchedule = dentists.map(dentist => {
        if (dentist.dentistSchedule) {
          return dentist.dentistSchedule.sort((a, b) => {
            const dayA = daysOfWeekOrder.indexOf(a.day);
            const dayB = daysOfWeekOrder.indexOf(b.day);
            return dayA - dayB;
          });
        }
        return [];
      });

      const flatSchedule = allDentistSchedule.flat();
      const scheduleIndex = (d.x -96 ) / 250


      const dentistFilteredSchedule = dentists.map(dentist => {
        if ( !dentist.dentistSchedule) return [];
        return dentist.dentistSchedule.map(() => {
          return dentist._id;
        });
      }).flat()

      const dentistId = dentistFilteredSchedule[scheduleIndex];
      const selectedDay  = flatSchedule[scheduleIndex]
      const newDate = generateDateForDay(selectedDay.day, date)



      const differenceInMilliseconds = 
      removeDateOffset(appointment.appointmentData.appointmentDate.end).getTime() - 
      removeDateOffset(appointment.appointmentData.appointmentDate.start).getTime();
  
      const differenceInMinutes = differenceInMilliseconds / 1000 / 60;
      
      // Create a new Date object based on newDate to preserve the original date
      const startTime = new Date(newDate);
      startTime.setHours(openingTime);
      startTime.setMinutes(0 + d.y / 2);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + differenceInMinutes);
      
      // Set the full year, month, and date to ensure the date is preserved
      startTime.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      endTime.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
  
      const dentistIndex = dentists.findIndex((dentist) => dentist._id === dentistId);

      const newTimeSlots = generateDayTimeSlots(startTime, endTime, dentistId);

      const alreadyExists = timeSlots.some(slot => {
        return newTimeSlots.some(newSlot => 
          newSlot.time === slot.time && newSlot.id === slot.id
        );
      })

      if (alreadyExists) {
        addOldTimeSlots();
        warn()
        return;
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

  const handleOnResizeStart = (start: Date, end: Date): RndResizeStartCallback =>{
    if (!dentists || !appointments) return () => {};
    return () => {
      const dentistId = appointment.dentistData._id;
      const oldTimeSlots = generateDayTimeSlots(start, end, dentistId)
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

  const handleOnResizeStop = (startTime: Date, endTime: Date,index: number): RndResizeCallback => {
    if (!dentists || !appointments) return () => {};
    return (_, __, ___, d, ____) => {
      const totalMinutes = d.height / 2;
      const newTime = new Date(endTime);
      newTime.setMinutes(newTime.getMinutes() + totalMinutes);
  
      if (newTime.getHours() > closingTime || (newTime.getHours() === closingTime && newTime.getMinutes() > 0)) {
        warn()
        return null;
      }

      const newTimeSlots = generateDayTimeSlots(startTime, newTime, appointment.dentistData._id);
      const existsInTimeSlots = timeSlots.some(slot => {
        return newTimeSlots.some(newSlot => 
          newSlot.time === slot.time && newSlot.id === slot.id
        );
      }) 

      if(existsInTimeSlots) {
        warn()
        return null;
      }



      const newData: IUpdateAppointmentSizeRequest = {
        _id: appointment.appointmentData._id,
        appointmentTime: {
          start: addDateOffset(startTime),
          end: addDateOffset(newTime),
        },
      };
  
      sizeMutation.mutate(newData);

      const newAppointmentSize: IAppointmentResponse = {
        ...appointment,
        appointmentData: {
          ...appointment.appointmentData,
          appointmentDate: {
            start: addDateOffset(startTime),
            end: addDateOffset(newTime),
          },
        },
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

  const isFinished = status === "Finished" 
  const isCancelled = status === "Cancelled"

  const isDisabled = status === "Cancelled" || isFinished || isCancelled

  return (
    <Rnd
      size={{ width: `${gridColWidth}px`, height: `${ size * 30 }px` }}
      position={{ x: positionX , y: positionY}}
      dragGrid={[gridColWidth, 30]}
      resizeGrid={[gridColWidth, 30]}
      className={` absolute z-20  rounded-lg px-2 pb-2  `}
      onDragStart={handleOnDragStart(start, end)}
      onDragStop={handleOnDragStop(start, end, index, appointment.dentistData._id)}    
      onResizeStart={handleOnResizeStart(start, end)}
      onResizeStop={handleOnResizeStop(start, end, index)}          
      minHeight={30}
      disableDragging={isDisabled}
      children={
        <AppointmentCard 
          fullName={appointment.patientData.patientFullName}
          status={status}
          start={start}
          end={end}
          handleOpen={handleOpen}
          type='week'
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

export default WeekAppointmentCard