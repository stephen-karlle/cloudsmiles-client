import { PaymentData } from '../../types/dashboard.types'
import { 
  Bar, 
  BarChart as RechartBarChart, 
  CartesianGrid, 
  Tooltip, 
  XAxis, 
  YAxis, 
  ResponsiveContainer
} from 'recharts'

type BarChartProps = {
  payments: PaymentData[]
}

const BarChart = ({ payments }: BarChartProps) => {



  return (
    <ResponsiveContainer>
      <RechartBarChart 
        data={payments} 
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        barGap={2}
      >
        <CartesianGrid 
          vertical={false} 
          strokeDasharray="1 5" 
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
          tickMargin={30}
        />
        <Tooltip 
          cursor={{ fill: 'none' }} // Disable hover background
        />
        <Bar 
          dataKey="paid" 
          fill="#4ade80" 
          radius={[4, 4, 0, 0]} 
          barSize={15}
        />
        <Bar 
          dataKey="partial" 
          fill="#8b5cf6" 
          radius={[4, 4, 0, 0]} 
          barSize={15}
        />


      </RechartBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart