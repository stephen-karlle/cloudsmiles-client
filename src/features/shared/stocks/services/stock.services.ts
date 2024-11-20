import { privateApiClient } from "@constants/api.constants";


export const getStocks = async () => {
  try {
    const response = await privateApiClient.get('/stock/v1/get-stocks');
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
}

