import { privateApiClient } from "@constants/api.constants";

 export const createProduct = async (data: FormData) => {
  try {
    const response = await privateApiClient.post('/stock/v1/create-product', data);
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
}


export const findProducts =  async (keywords: string) => {
  try {
    const res = await privateApiClient.get(`/stock/v1/find-products/${keywords}`);
    return res.data;
  } catch (error) {
    return error
  }
}

export const validateSku = async (sku: string) => {
  try {
    await privateApiClient.get(`/stock/v1/validate-sku/${sku}`);
    return true;
  } catch (error) {
    return false
  }
}

export const getProducts = async () => {
  try {
    const res = await privateApiClient.get(`/stock/v1/get-products`);
    return res.data 
  } catch (error ) {
    return error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const res = await privateApiClient.delete(`stock/v1/delete-product/${id}`);
    return res.data
  } catch (error) {
    return error
  }
}

export const editProduct = async (data: FormData) => {
  try {
    const res = await privateApiClient.put('/stock/v1/edit-product', data);
    return res.data
  } catch (error) {
    return error
  }
}