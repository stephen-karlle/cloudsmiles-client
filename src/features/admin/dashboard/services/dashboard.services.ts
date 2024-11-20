import { privateApiClient } from "@constants/api.constants"

export const getStocks = async () => {
  try {
    const res = await privateApiClient.get('/dashboard/v1/stocks');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}


export const getVisits = async () => {
  try {
    const res = await privateApiClient.get('/dashboard/v1/visits');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}