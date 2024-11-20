import { isPasswordStrong } from '@features/guest/authentication/recovery/utils/recovery.utils'
import { motion } from 'framer-motion'

type PasswordStrengthIndicatorProps = {
  password: string
}

const PasswordStrengthIndicator = ({ 
  password 
}: PasswordStrengthIndicatorProps) => {
  const passwordStrength = isPasswordStrong(password)

  const getStrengthProperties = (strength: string) => {
    switch (strength) {
      case 'weak':
        return { width: '33%', bgColor: 'bg-rose-500', text: 'Weak password' }
      case 'medium':
        return { width: '66%', bgColor: 'bg-amber-500', text: 'Medium strength password' }
      case 'strong':
        return { width: '100%', bgColor: 'bg-green-500', text: 'Strong password' }
      default:
        return { width: '0%', bgColor: 'bg-gray-200', text: '' }
    }
  }
  
  const { width, bgColor, text } = getStrengthProperties(passwordStrength)

  return (
    <section className="flex flex-col w-full">
      <div className="w-full mt-4 flex items-center justify-start h-1 rounded-full bg-gray-100 relative">
        <motion.div
          className={`h-1 rounded-full absolute ${bgColor}`}
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {text && (
        <p className={`text-sm mt-2 ${passwordStrength === 'weak' ? 'text-rose-500' : passwordStrength === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>
          {text}
        </p>
      )}
    </section>
  )
}

export default PasswordStrengthIndicator
