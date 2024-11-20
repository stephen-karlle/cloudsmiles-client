import { useChatbotStore } from '@stores/chatbot/chatbot.store';
import InformationIcon from '@icons/linear/InformationIcon';
import CloseIcon from '@icons/linear/CloseIcon';

const Header = () => {

  const setDrawerOpen = useChatbotStore((state) => state.setDrawerOpen)

  return (
    <article className="flex w-full h-16 items-center justify-center border-b p-4">
      <section className="flex items-center justify-items-center gap-1 flex-1 ">
        <div className="flex items-center justify-center relative  w-5 h-5">
          <svg className="text-lime-500 w-3 h-3  fill-lime-500 "  viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="4" strokeWidth="2" stroke="currentColor" />
          </svg>
          <svg className="text-lime-500 w-4 h-4 absolute animate-ping duration-100 fill-none stroke-lime-500" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="4" strokeWidth="1" stroke="currentColor" />
          </svg>
        </div>
        <span className="text-gray-700 font-medium text-base">AI Assistant</span>

      </section>
      <section className="flex items-center justify-center gap-4">
        {/* About the chatbot */}
        <button className="flex items-center justify-center gap-2">
          <InformationIcon className="stroke-2 stroke-gray-500 w-5 h-5" />
          <p className="text-gray-700 text-sm">About Smiley</p>
        </button>
        {/* Seperator */}
        <div className="w-[1px] h-7 bg-gray-300" />
        {/* Close button */}
        <button 
          className="bg-white flex items-center justify-center w-8 h-8"
          onClick={() => setDrawerOpen(false)}
        >
          <CloseIcon className="stroke-2 stroke-gray-500 w-7 h-7" />
        </button>
      </section>
    </article>
  )
}

export default Header
