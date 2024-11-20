

export type VerifyType = {
  email: string;
  otp: string;
}

export type VerifyStoreType = {
  email: string;
  setEmail: (email: string) => void;

  isLoading: boolean;
  setIsLoading: (isLoaded: boolean) => void;
}