import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordSchema } from "../schemas/recovery.schema";
import { ResetPasswordType } from "../types/recovery.types";
import { ResetPassword } from "../services/recovery.services";
import { useRecoveryStore } from "../stores/recovery.store";
import { useNavigate } from "react-router-dom";

const useResetPassword = (token: string) => {
  const navigate = useNavigate()
  const setIsLoading = useRecoveryStore((state) => state.setIsLoading);
  
  const methods = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      token: token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { setError } = methods;

  const mutation = useMutation({
    mutationFn: async (data: ResetPasswordType) => {
      await ResetPassword(data);
    },
    onSuccess: () => {
      navigate('/login')
    },
    onError: () => {
      setError("newPassword", {
        type: "manual",
        message: "You cannot use the same password as your current password",
      })
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useResetPassword;
