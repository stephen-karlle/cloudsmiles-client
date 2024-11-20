import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RecoverySchema } from "../schemas/recovery.schema";
import { RecoveryType } from "../types/recovery.types";
import { RecoverAccount } from "../services/recovery.services";
import { useRecoveryStore } from "../stores/recovery.store";

const useRecovery = () => {
  const setIsLoading = useRecoveryStore((state) => state.setIsLoading);
  const setIsSuccess = useRecoveryStore((state) => state.setIsSuccess);
  const setEmail = useRecoveryStore((state) => state.setEmail);
  

  const methods = useForm<RecoveryType>({
    resolver: zodResolver(RecoverySchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const { setError } = methods;

  const mutation = useMutation({
    mutationFn: async (data: RecoveryType) => {
      await RecoverAccount(data);
    },
    onSuccess: (_, variables) => {
      setIsSuccess(true);
      setEmail(variables.email);
    },
    onError: () => {
      setError("email", {
        type: "manual",
        message: "Email does not exist",
      })
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<RecoveryType> = async (data) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useRecovery;
