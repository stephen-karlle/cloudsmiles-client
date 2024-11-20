import { getColorForInitial, getInitials } from '@utils/name.utils'

type AvatarProps = {
  className?: string;
  name: string;
  src: string | null | undefined
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}

const Avatar = ({
  className,
  name,
  src,
  size = "sm"
}:AvatarProps) => {

  const intials = getInitials(name)
  const bgColor = getColorForInitial(name)

  const getAvatarSize = (size: string) => {
    switch(size){
      case "xs":
        return "w-8 h-8"
      case "sm":
        return "w-9 h-9"
      case "md":
        return "w-10 h-10"
      case "lg":
        return "w-12 h-12"
      case "xl":
        return "w-14 h-14"
      case "2xl":
        return "w-16 h-16"
      case "3xl":
        return "w-20 h-20"
      default:
        return "w-9 h-9"
    }
  }

  const getTextSize = (size: string) => {
    switch(size){
      case "sm":
        return "text-sm"
      case "md":
        return "text-base"
      case "lg":
        return "text-lg"
      case "xl":
        return "text-xl"
      case "2xl":
        return "text-2xl"
      case "3xl":
        return "text-3xl"
      default:
        return "text-xs"
    }
  }

  const AvatarSize = getAvatarSize(size)
  const textSize = getTextSize(size)

  return (
    src ? (
      <img src={src} alt={`${name} avatar`} className={`${AvatarSize} rounded-full ring-1 ring-gray-200 flex-shrink-0 ${className}`} />
    ) : (
      <div className={`${bgColor} ${AvatarSize} rounded-full flex items-center justify-center flex-shrink-0 ${className}`}>
        <p className={`text-white  ${textSize} `}>
          {intials}
        </p>
      </div>
    )
  )
}

export default Avatar