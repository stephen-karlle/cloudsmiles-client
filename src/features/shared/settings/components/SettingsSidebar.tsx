
import ShieldIcon from '@icons/linear/ShieldIcon'
import UserIcon from '@icons/linear/UserIcon'
import { useSettingsStore } from '../stores/settings.store'

const SettingsHeader = () => {

  const setActiveBranch = useSettingsStore((state) => state.setActiveBranch)
  const activeBranch = useSettingsStore((state) => state.activeBranch)

  return (
    <main className="w-80 h-full flex flex-col bg-white border-r border-gray-200 justify-start flex-shrink-0 p-6">
      <button 
        onClick={() => setActiveBranch('profile')}
        className={` font-medium text-base text-start flex items-center gap-2 h-9
          
        ${activeBranch === 'profile' ? 'text-gray-700 stroke-gray-700' : 'text-gray-500 stroke-gray-500'}`}
      >
        <UserIcon className={`w-5 h-5 stroke-2 ${activeBranch === "profile" ? " stroke-lime-500 " : " stroke-gray-500 "} `} />
        Profile
      </button>
      <button 
        onClick={() => setActiveBranch('security')}
        className={` font-medium text-base text-start flex items-center gap-2 h-9
          
        ${activeBranch === 'security' ? 'text-gray-900 stroke-gray-700' : 'text-gray-500 stroke-gray-500'}`}
      >
        <ShieldIcon className={`w-5 h-5 stroke-2 ${activeBranch === "security" ? " stroke-lime-500 " : " stroke-gray-500 "} `} />
        Security
      </button>
    </main>
  )
}

export default SettingsHeader
