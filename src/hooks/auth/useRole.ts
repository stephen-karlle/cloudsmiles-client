import { useQuery } from "@tanstack/react-query";
import { privateApiClient } from "@constants/api.constants";

export const useRole = () => {
 
  return useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      try {
        const response = await privateApiClient.get(`/auth/v1/verify-role`);
        const userRole = response.data.credentialRole;
        return userRole;
      } catch (error) {
        return null;
      }
    },
  });
};
