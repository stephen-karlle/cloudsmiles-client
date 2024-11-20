import Skeleton from '@components/ui/Skeleton'

const TableDataSkeleton = () => {

  const gridTemplate = "20% 15% 20% auto 10% 10% 5%"


  return (
    <main className="flex flex-col items-center justify-start h-full w-full">
      <header 
        className="grid w-full h-10 items-center  px-6"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        <Skeleton className="w-32 h-4 rounded-md" />
        <Skeleton className="w-16 h-4 rounded-md" />
        <Skeleton className="w-20 h-4 rounded-md" />
        <Skeleton className="w-24 h-4 rounded-md" />
        <Skeleton className="w-28 h-4 rounded-md" />
        <Skeleton className="w-32 h-4 rounded-md" />

      </header>
      <section className="flex flex-col w-full px-6 h-full flex-grow-0  overflow-y-scroll ">
        {Array(9).fill(0).map((_, index) => (
          <section 
            key={index}
            className="grid w-full items-center border-b py-4 "
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-4">
              <Skeleton className=" h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-40 h-4 rounded-md" />
                <Skeleton className="w-20 h-4 rounded-md" />
              </div>
            </div>
            <Skeleton className="w-36 h-4 rounded-md" />
            <Skeleton className="w-24 h-4 rounded-md" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-16 h-4 rounded-md" />
              <Skeleton className="w-40 h-4 rounded-md" />
            </div>            
            <Skeleton className="w-12 h-4 rounded-md" />
            <Skeleton className="w-32 h-4 rounded-md" />
            <div className="w-full flex items-center justify-end">
              <Skeleton className="w-8 h-4 rounded-md" />
            </div>
          </section>
        ))}
      </section>
    </main>
  )
}

export default TableDataSkeleton