import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ProfileType } from "../types/settings.types";
import { ProfileSchema } from "../schemas/profile.schema";
import { useUserStore } from "@stores/user.store";
import { validateEmail } from "@features/guest/authentication/signup/services/signup.services";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../services/settings.services";
import { useSettingsStore } from "../stores/settings.store";
import { getRedirectLink } from "@features/guest/authentication/login/utils/login.utils";

const useEditProfile = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoading = useSettingsStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const methods = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      profileAvatar: user.avatar,
      profileFullName: user.fullName,
      profileGender: user.gender,
      profileDateOfBirth: user.dateOfBirth,
      profileAddress: user.address,
      profileEmail: user.email,
      profilePhoneNumber: user.phoneNumber,
      userId: user._id,
      role: user.role,
    }
  });

  const { setError } = methods;

  const mutation = useMutation({
    mutationFn: async (data: ProfileType) => {
      
      console.log(data)

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "profileAvatar" && value instanceof File) {
          formData.append("avatar", value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });
      
      const res = await editProfile(formData);
      return res; 
    },
    onSuccess: (data) => {
      const redirectLink = getRedirectLink(user.role);
      setUser(data);
      navigate(redirectLink)
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });
  
  const onSubmit = async (data: ProfileType) => {
    setIsLoading(true);
    if (data.profileEmail !== user.email) {
      const isEmailValid = await validateEmail(data.profileEmail);
      if (!isEmailValid) {
        setError("profileEmail", {
          type: "manual",
          message: "Email is already taken",
        });
        setIsLoading(false);
        return false;
      }
    }

    mutation.mutate(data);
  };

  return {
    ...methods,
    onSubmit,
  };
};

export default useEditProfile;