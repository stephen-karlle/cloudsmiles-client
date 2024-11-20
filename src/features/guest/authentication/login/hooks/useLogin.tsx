import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas/login.schema";
import { loginLocal } from "../services/login.services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginType } from "../types/login.types";
import { useAuthStore } from "../stores/auth.store";

const useLogin = () => {
  const navigate = useNavigate();
  const setLoading = useAuthStore((state) => state.setLoading);

  const methods = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "admin@vsdental.com",
      password: "Sphen0915026606!",
    },
  });

  const { setError } = methods;

  const mutation = useMutation({
    mutationFn: async (data: LoginType) => {
      const token = await loginLocal(data);
      if (!token) {
        methods.setError("email", {
          type: "manual",
          message: "Invalid email",
        });
        methods.setError("password", {
          type: "manual",
          message: "Invalid password",
        });
        return false;
      }
      return token; 
    },
    onSuccess: (token) => {
      navigate(`/verify?token=${token}`);
    },
    onError: () => {
      setError("email", {
        type: "manual",
        message: "Invalid email",
      });
      setError("password", {
        type: "manual",
        message: "Invalid password",
      });
      return false;
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    console.log("s")
    setLoading(true);
    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useLogin;
