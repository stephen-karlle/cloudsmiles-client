import { useSettingsStore } from '../../stores/settings.store'
import ProfileBranch from '../branch/ProfileBranch'
import SecurityBranch from '../branch/SecurityBranch'
import SettingsSidebar from '../SettingsSidebar'

const SettingsOutlet = () => {

  const activeBranch = useSettingsStore((state) => state.activeBranch)
  
  return (
    <main className="h-full bg-white flex ">
      <SettingsSidebar />
      <section className="flex-grow overflow-y-hidden">
        {activeBranch === 'profile' && <ProfileBranch />}
        {activeBranch === 'security' && <SecurityBranch />}
      </section>
    </main>
  )
}

export default SettingsOutlet
