import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePatientProfile } from "../../services/state/usePatientProfile"
import { useUserStore } from "@stores/user.store"
import ChevronIcon from "@icons/linear/ChevronIcon"
import Avatar from "@components/ui/Avatar"
import InformationBranch from "../branch/InformationBranch"
import CheckupBranch from "../branch/CheckupBranch"

type PatientProfileOutletProps = {
  id: string | undefined,
}

const PatientProfileOutlet = ({ id }:  PatientProfileOutletProps) => {

  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const [ activeBranch, setActiveBranch ] = useState<string>('Information')

  const { data: profile, isLoading } = usePatientProfile(id || "")



  const getPatientBadgeStyle = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-50 text-green-500';
      case 'Pending':
        return 'bg-amber-50 text-amber-500';
      default:
        return 'bg-gray-50 text-white';
    }
  }

  
  const handleBack = () => {
    navigate('/patient')
  }
  if (!id) return <div>Invalid Patient</div>
  if (isLoading) return <p>Loading...</p>
  if (!profile) return <p>No Patient Found</p>

  const patientData = profile.patientData
  const badgeStyle = getPatientBadgeStyle(patientData.patientStatus)

  return (
    <article className="w-full h-full flex flex-col overflow-y-auto">
      {user.role !== "patient" && 
        <header className="px-6 py-4 border-b border-gray-200 flex items-center justify-start gap-2 w-full">
          <button className="text-gray-500 text-md " onClick={handleBack} >Patients</button>
          <ChevronIcon className="w-4 h-4 stroke-2 stroke-gray-500 -rotate-90" />
          <label className="text-gray-700 text-md font-medium ">Profile</label>
        </header>
      }
      {/* Patient Header Details */}
      <section className="p-8 flex w-full gap-4">
        <Avatar 
          size="3xl" 
          src={patientData.patientAvatar} 
          name={patientData.patientFullName}
        />
        <div className="flex flex-col w-full items-start justify-start gap-1">
          <h1 className="text-2xl font-medium text-gray-700 mt-4">{patientData.patientFullName}</h1>
          <span className={`text-xs rounded-full uppercase px-2 py-1 ${badgeStyle} `}>{patientData.patientStatus}</span>
        </div>
      </section>
      {/* Navigation Buttons */}
      <section className="w-full border-b border-gray-200 h-fit relative flex items-start px-4 gap-4">
        {[ 'Information', 'Checkups' ].map((branch, index) => {
          const isActive = activeBranch === branch
          return(
            <button 
              key={index}
              className={`min-w-fit text-center px-2 font-normal tracking-wide py-2 relative flex items-center justify-center transition-all duration-300
              ${isActive ? 'text-gray-700' : ' text-gray-500 '}  
              `}
              onClick={() => setActiveBranch(branch)}
            >
              {branch}
              {isActive && <div className="w-full h-[2px] rounded-full absolute bottom-0 bg-lime-500" />}
            </button>
          )
        })}
      </section>
      {activeBranch === 'Information' && <InformationBranch /> }
      {activeBranch === 'Checkups' && <CheckupBranch /> }

    </article>
  )
}

export default PatientProfileOutlet