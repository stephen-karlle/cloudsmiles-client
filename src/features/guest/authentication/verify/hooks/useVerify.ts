import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { VerifyType } from "../types/verify.types";
import { VerifySchema } from "../schemas/verify.schema";
import { verifyOtp } from "../services/verify.services";
import { getRedirectLink } from "../../login/utils/login.utils";
import { useVerifyStore } from "../stores/verify.stores";

const useVerify = (email: string) => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setIsLoading = useVerifyStore((state) => state.setIsLoading);

  const methods = useForm<VerifyType>({
    resolver: zodResolver(VerifySchema),
    mode: "onSubmit",
    defaultValues: {
      email: email,
      otp: "",
    },
  });

  const { setError } = methods;

  const mutation = useMutation({
    mutationFn: async (data: VerifyType) => {
      const role = await verifyOtp(data);
      return role; 
    },
    onSuccess: (role) => {
      if (role) {
        queryClient.invalidateQueries({queryKey: ["userRole"]});
        const redirectLink = getRedirectLink(role)
        navigate(redirectLink);
      }    
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: () => {
      setError("otp", {
        type: "manual",
        message: "OTP is incorrect",
      });
    }
  });

  const onSubmit: SubmitHandler<VerifyType> = async (data) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useVerify;
