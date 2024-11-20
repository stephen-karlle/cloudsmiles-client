

export const getRedirectLink = (role: string) => {
  switch (role) {
    case "admin":
      return "/dashboard"
    case "patient":
      return "/calendar"
    case "assistant":
      return "/calendar"
    case "dentist":
      return "/calendar"
    case "guest":
      return "/login"
    default:
      return "/login"
  }
}
