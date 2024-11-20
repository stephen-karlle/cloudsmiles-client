import { useEffect, useState } from "react";

interface ITimeLine{
  currentTime: string;
}

const TimeLine = ({currentTime}: ITimeLine) => {
  
  const [ topPosition, setTopPosition ] = useState<number>(-10);
  
  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      const open = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);      

      const differenceInMilliseconds = now.getTime() - open.getTime();
      const differenceInMinutes = differenceInMilliseconds / 1000 / 60;
      setTopPosition(differenceInMinutes * 2)
    };
  
    updatePosition(); 
    const intervalId = setInterval(updatePosition, 60000); 
  
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="absolute h-[2px] bg-rose-500 pl-[96px] flex items-center justify-start z-20 w-full" 
      style={{
        top: `${topPosition}px`,
        position: 'absolute'
      }}
    >
      <div className="w-full relative flex items-center justify-center">
        <span className="w-2 h-2 bg-rose-500 rounded-full absolute left-0 -inset-1"/>
        <p className="px-4 bg-rose-500 h-6 place-content-center rounded-md text-white absolute tracking-wider text-sm">
          {currentTime}
        </p>
      </div>
    </div>
  )
}

export default TimeLine
