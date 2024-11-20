
interface IUnvailableCard {
  gridColWidth: number
  size: number
  position: {
    x: number
    y: number
  }
}

const UnavailableCard = ({
  gridColWidth,
  size,
  position
}: IUnvailableCard) => {
  console.log("position", position)
  console.log("size", size)
  return (
    <div 
      className="flex items-center justify-center stripes-unavailable"
      style={{
        width: `${gridColWidth}px`,
        height: `${size * 30}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute'
      }}
    >
      <p className="text-gray-500 text-xs tracking-wide px-2 uppercase bg-gray-100 font-medium rounded-sm">NOT AVAILABLE</p>
    </div>
  )
}

export default UnavailableCard