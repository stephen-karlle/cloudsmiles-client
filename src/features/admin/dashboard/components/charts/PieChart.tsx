import { 
  Pie, 
  PieChart as RechartPieChart,
  ResponsiveContainer,
  Cell,
  Tooltip 
} from 'recharts';
import { appointmentColors } from '../../constants/color.constants';
import { AppointmentChartData } from '../../types/dashboard.types';

type PieChartProps = {
  appointments: AppointmentChartData[]
}

const PieChart = ({ appointments }: PieChartProps) => {

  const grid = Array(100).fill(0).map(() => ({
    name: `Slice`,
    value: 1, // Each slice gets a value of 1
  }));

  const TotalValue = appointments.reduce((acc, item) => acc + item.value, 0) ?? 0;

  return (
    <div className='w-full relative h-[200px]'>
      <ResponsiveContainer>
        <RechartPieChart>
          {/* Outer Pie Chart */}
          <Pie 
            data={appointments} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            innerRadius={75}  
            outerRadius={90}  
            fill="#82ca9d"
            cornerRadius={20}  
            paddingAngle={-20} 
            focusable={false}
             
          >
            {appointments.map((entry, index) => (
              <Cell 
                key={`cell-${index} ${entry}`} 
                fill={appointmentColors[entry.name]} 
              />
            ))}
          </Pie>
          <Pie 
            data={grid}  // Use the structured grid data
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            innerRadius={57}  // Adjust this to control the inner circle size
            outerRadius={65}  // Adjust this to control the outer circle size
            fill="#82ca9d"
            isAnimationActive={false} 
            focusable={false}
          >
            {grid.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill="#e5e7eb"
              />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip 
            formatter={(value, name) => [`${value} ${name}`]} 
            wrapperStyle={{ zIndex: 99 }}
            labelStyle={{ fontWeight: 'bold' }}
            contentStyle={{ color: '#333' }}
          />
        </RechartPieChart>
      </ResponsiveContainer>

      {/* Add text in the center of the pie chart */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none', 
        }}
      >
        <p className="text-xs tracking-wide uppercase text-gray-500">TOTAL</p>
        <h1 className="text-2xl text-gray-700 font-semibold">{TotalValue}</h1>
      </div>
    </div>
  );
}

export default PieChart;
