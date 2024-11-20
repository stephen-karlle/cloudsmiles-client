import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SecurityType } from "../types/settings.types";
import { SecuritySchema } from "../schemas/profile.schema";
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "../stores/settings.store";
import { changePassword } from "../services/settings.services";
import { logout } from "@features/guest/authentication/login/services/login.services";

const useChangePassword = () => {

  const queryClient = useQueryClient();
  const setIsLoading = useSettingsStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const methods = useForm<SecurityType>({
    resolver: zodResolver(SecuritySchema),
    mode: "onSubmit",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const { setError } = methods;

  const mutation = useMutation({
    mutationFn: async (data: SecurityType) => {
      const res = await changePassword(data)
      return res; 
    },
    onSuccess: async () => {
      await logout()
      queryClient.clear()
      navigate('/login')
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: () => {
      setError("oldPassword", {
        type: "manual",
        message: "Old password is incorrect",
      });
    }
  });
  
  const onSubmit = async (data: SecurityType) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useChangePassword;