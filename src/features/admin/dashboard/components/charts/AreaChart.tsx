import { 
  AreaChart as RechartAreaChart, 
  CartesianGrid, 
  XAxis, 
  Tooltip, 
  YAxis, 
  Area, 
  ResponsiveContainer 
} from 'recharts';
import { VisitData } from '../../types/dashboard.types';

type AreaChartProps = {
  visits: VisitData[]
}

const AreaChart = ({visits}: AreaChartProps) => {

  return (
    <ResponsiveContainer>
      <RechartAreaChart 
        width={750} 
        height={230} 
        data={visits}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVisit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d9f99d" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#d9f99d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          vertical={false} 
          strokeDasharray="1 20" 
          strokeLinejoin='round'
          strokeWidth={1}
          stroke="#6b7280"
        />
        <XAxis 
          dataKey="name" 
          className="tracking-wider"
          tickLine={false}
          axisLine={false}
          tick={{ 
            transform: "translate(-3, 0)", 
            fontSize: 12,
            fontWeight: 200,
            fill: "#9ca3af",
          }}
          tickMargin={15}
          tickSize={2}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tickFormatter={(value) => value >= 1000 ? Math.floor(value / 1000) + 'K' : value.toString()}
          tick={{ 
            fill: "#9ca3af",
            fontSize: 12,
            fontWeight: 200
          }}  
          tickMargin={40}
        />
        <Tooltip 
          cursor={{ fill: 'none' }} 
        />
        <Area 
          type="linear" 
          dataKey="visit" 
          stroke="#84cc16" 
          fillOpacity={1} 
          fill="url(#colorVisit)" 
          dot={{ fill:"#84cc16",  stroke: '#fff', strokeWidth: 2, r: 4 }} 
        />
      </RechartAreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChart;
