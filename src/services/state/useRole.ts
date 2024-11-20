import { useQuery } from "@tanstack/react-query";
import { privateApiClient } from "@constants/api.constants";
import { useUserStore } from "@stores/user.store";

export const useRole = () => {
  const setUser = useUserStore((state) => state.setUser);
  return useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      try {
        const response = await privateApiClient.get(`/auth/v1/verify-user`);
        const userRole = response.data.userRole;
        const userData = response.data.userData;

        setUser({
          ...userData,
          role: userRole,
        });
        return userRole || ""
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 60
  });
};
