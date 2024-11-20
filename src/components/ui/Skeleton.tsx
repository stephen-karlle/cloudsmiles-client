
type SkeletonProps = {
  className: string
}

const Skeleton = ({
  className
}: SkeletonProps) => {
  return (
    <div
      className={`${className} animate-shimmer decoration-gray-100 `}
    />  
  )
}

export default Skeleton