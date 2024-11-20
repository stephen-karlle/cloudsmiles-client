

export type RecoveryType = {
  email: string
}

export type ResetPasswordType = {
  token: string
  newPassword: string
  confirmPassword: string
}