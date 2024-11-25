import SearchIcon from '@icons/linear/SearchIcon'

interface ISearchInput {
  placeholder: string
  onChange: (value: string) => void
}

const SearchInput = ({ placeholder, onChange}: ISearchInput) => {
  return (
    <div className="px-4 py-2 ring-1 ring-gray-200 rounded-full gap-2 flex items-center justify-center w-[20rem] h-10">
      <SearchIcon className="w-4 h-4 stroke-2 stroke-gray-500"/>
      <input type="text"
        className="outline-none text-gray-700 w-full placeholder:text-base text-base font-normal" 
        placeholder={placeholder} 
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
