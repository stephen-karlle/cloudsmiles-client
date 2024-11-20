import SearchIcon from '@icons/linear/SearchIcon'

interface ISearchInput {
  placeholder: string
}

const SearchInput = ({ placeholder }: ISearchInput) => {
  return (
    <div className="px-4 py-2 ring-1 ring-gray-200 rounded-full gap-2 flex items-center justify-center w-[20rem]">
      <SearchIcon className="w-5 h-5 stroke-2 stroke-gray-500"/>
      <input type="text" className="outline-none text-gray-700 w-full" placeholder={placeholder} />
    </div>
  )
}

export default SearchInput
