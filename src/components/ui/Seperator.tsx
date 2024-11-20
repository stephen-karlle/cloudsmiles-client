
interface ISeperator {
  className?: string;
}

const Seperator = ({ className } : ISeperator) => {
  return (
    <div className={ className + " bg-gray-200 w-[1px] rounded-full "} />
  )
}

export default Seperator
