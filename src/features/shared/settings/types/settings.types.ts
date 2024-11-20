

export type ProfileType = {
  profileAvatar: File | null | string
  profileFullName: string;
  profileGender: string;
  profileDateOfBirth: string | null;
  profileAddress: string;
  profileEmail: string;
  profilePhoneNumber: string;
  userId: string;
  role: string;
}


export type SecurityType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}