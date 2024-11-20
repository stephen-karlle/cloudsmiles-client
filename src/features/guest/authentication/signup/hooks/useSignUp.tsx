import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPatientSchema } from "../schemas/signup.schema";
import { useSignUpStore } from "../stores/useSignUpStore";
import { SignUpType } from "../types/stores.types";
import { signUpLocal } from "../services/signup.services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const useSignUp = () => {

  const navigate = useNavigate();
  const setIsLoading = useSignUpStore((state) => state.setIsLoading);
  const setActiveTab = useSignUpStore((state) => state.setActiveTab)

  const methods = useForm<SignUpType>({
    resolver: zodResolver(NewPatientSchema),
    mode: "onSubmit",
    defaultValues: {
      patientData: {
        patientFullName: "",
        patientDateOfBirth: new Date(),
        patientGender: "",
        patientAddress: "",
      },
      credentialData: {
        credentialEmail: "",
        credentialPassword: "",
        credentialConfirmPassword: "",
      },
    },
  });

  
  const mutation = useMutation({
    mutationFn: async (data: SignUpType) => {
      const token = await signUpLocal(data);
      return token;
    },
    onSuccess: (data) => {
      navigate(`/verify?token=${data}`);
      setActiveTab("Credential");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });


  
  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    setIsLoading(true)
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useSignUp;