import { IStockStatus } from "../../types/stock.types";

interface IStackedBarChart {
  data: IStockStatus[] 
  totalProducts: number 
}

const StackedBarChart = ({ data, totalProducts }: IStackedBarChart) => {


  const percentages = data.map(item => ({
    status: item.status,
    percentage: Math.round((item.value / totalProducts) * 100),
  }));

  const gridTemplate = percentages.map(item => `${item.percentage}%`).join(' ');


  const colorMap = ['green','amber','rose', ];


  return (
    <section className="flex flex-col w-fit gap-2">
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-medium text-gray-900">{totalProducts}</h1>
        <label className="text-sm text-gray-500">{totalProducts > 1 ? "products" : "product"}</label>
      </div>
      <div className="w-[20rem] grid grid-flow-col gap-1 " style={{ gridTemplateColumns: gridTemplate }}>
        {colorMap.map(( color, index) => (
          <div key={index} className={`h-2 rounded-sm ${"bg-"+color+"-500"}`} />
        ))}
      </div>
      <div className="flex gap-4 items-center justify-start">
        {data.map((product, index) => (
          <figure 
            key={index}
            className="flex items-center justify-start gap-2"
          >
            <div className={`w-2 h-2 rounded-full bg-${colorMap[index]}-500`} />
            <label className="text-sm text-gray-500">{product.status}</label>
            <label className="text-base font-medium text-gray-700">{product.value}</label>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default StackedBarChart
