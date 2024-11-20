import { useQuery } from '@tanstack/react-query'
import { useKnowledgeStore } from '../stores/knowledge.store'
import { getKnowledgeCount } from '../services/knowledge.services'
import LinkButton from '@components/shared/LinkButton'
import BulbIcon from '@icons/linear/BulbIcon'
import TableHeaderSkeleton from '@components/shared/skeletons/TableHeaderSkeleton'
import FilterLinesIcon from '@icons/linear/FilterLinesIcon'
import Button from '@components/ui/Button'
import PlusIcon from '@icons/linear/PlusIcon'
import AddContextForm from './forms/AddContextForm'

const KnowledgeHeader = () => {
  const setActiveOutlet = useKnowledgeStore((state) => state.setActiveOutlet)
  const activeOutlet = useKnowledgeStore((state) => state.activeOutlet)
  const setKnowledgeDrawerOpen = useKnowledgeStore((state) => state.setKnowledgeDrawerOpen)
  const setMainSheet = useKnowledgeStore((state) => state.setMainSheet)

  const { data: contextCount, isLoading} = useQuery(
    {
      queryKey: ['knowledgeHeaderData'],
      queryFn: getKnowledgeCount,
    },
  );

  const handleOpenCreateContext = () => {
    setKnowledgeDrawerOpen(true)
    setMainSheet({
      name: "MainSheet1",
      component: <AddContextForm />
    })
  }


  return (
    isLoading ? (
      <TableHeaderSkeleton />
    ) : (
      <section
        className="h-fit w-full flex flex-col bg-white "
      >            
        <header className="h-24 w-full flex items-center justify-start gap-4 p-6 ">
          <section className="flex items-start justify-start h-full">
            <figure className="w-10 h-10 rounded-full bg-lime-50 flex p-1 items-center justify-center">
              <BulbIcon className="w-6 h-6 stroke-2 stroke-lime-500" />
            </figure>
          </section>
          <section className="flex items-center justify-start h-full">
            <section className="flex flex-col items-start h-full">
              <label className="text-xs font-medium tracking-wide text-gray-500">
                  TOTAL {activeOutlet === "Context" ? "CONTEXTS" : "REQUESTS"}
              </label>
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">
                {activeOutlet === "Context" ? contextCount.contextCount : contextCount.requestCount}
              </h1>
            </section>
          </section>
        </header>
        <header className="w-8 flex gap-8 items-center justify-start h-auto px-6 ">
          <LinkButton 
            onClick={() => setActiveOutlet("Context")}
            isActive={activeOutlet === "Context"} 
            >
            Contexts
          </LinkButton>
          <LinkButton 
            onClick={() => setActiveOutlet("Request")}
            isActive={activeOutlet === "Request"} 
            >
            Requests
          </LinkButton>
        </header>
        <header className="flex items-center justify-between h-20 px-6 border-t border-gray-200">
          <Button variant="secondary" className="gap-2">
            <FilterLinesIcon className="w-5 h-5 stroke-2 stroke-gray-700" />
            Filters
          </Button>
          <Button 
            variant="primary"
            onClick={handleOpenCreateContext}
          >
            <PlusIcon className="stroke-2 stroke-white" />
            Add New Context
          </Button>
        </header>
      </section>
    )
  )
}

export default KnowledgeHeader
