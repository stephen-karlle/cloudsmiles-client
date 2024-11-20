import Skeleton from '@components/ui/Skeleton'

const TableHeaderSkeleton = () => {
  return (
    <section 
      className="h-fit w-full flex flex-col bg-white  justify-end flex-shrink-0"
    >
      <header className="h-24 w-full flex items-center justify-start gap-4 p-6 ">
        <section className="flex items-start justify-start h-full">
          <Skeleton className="w-10 h-10 rounded-full flex p-1 items-center justify-center" />
        </section>
        <section className="flex items-start justify-start h-full">
          <section className="flex flex-col items-start gap-2 ">
            <Skeleton className="w-40 h-4 rounded-md" />
            <Skeleton className="w-12 h-8 rounded-md" />
          </section>
        </section>
      </header>
      <header className="flex gap-8 items-center justify-start h-10 px-6 w-full ">
        <Skeleton className="w-12 h-4 rounded-md" />
        <Skeleton className="w-16 h-4 rounded-md" />
      </header>
      <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
        <Skeleton className="w-16 h-10 rounded-lg" />
        <Skeleton className="w-40 h-10 rounded-lg" />
      </header>
    </section>  
  )
}

export default TableHeaderSkeleton

