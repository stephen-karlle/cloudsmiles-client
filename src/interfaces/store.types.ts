

export type UserType = {
  _id: string;
  avatar: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  phoneNumber:string;
  email: string;
  role: string;
}

export type UserStoreType = {
  user: UserType
  setUser: (newUser: UserType) => void;
  clearUser: () => void;

}