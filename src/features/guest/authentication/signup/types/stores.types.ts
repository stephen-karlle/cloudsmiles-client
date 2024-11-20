import { z } from "zod";
import { NewPatientSchema } from "../schemas/signup.schema";


export type SignUpStoreType = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;

  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export type SignUpType = z.infer<typeof NewPatientSchema>;
