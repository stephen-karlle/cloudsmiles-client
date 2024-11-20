import { privateApiClient } from "@constants/api.constants";

export const createVendor = async (data: FormData) => {
  try {
    const response = await privateApiClient.post('/vendor/v1/create-vendor', data);
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
}

export const getVendors = async () => {
  try {
    const res = await privateApiClient.get('/vendor/v1/get-vendors/');
    return res.data 
  } catch (error) {
    return error
  }
}

export const editVendor =  async (data: FormData) => {
  try {
    const res = await privateApiClient.put('/vendor/v1/edit-vendor', data);
    return res.data;
  } catch (error) {
    return error
  }
}

export const deleteVendor = async (id: string) => {
  try {
    const res = await privateApiClient.delete(`/vendor/v1/delete-vendor/${id}`);
    return res.data;
  } catch (error) {
    return error
  }
}


export const getVendorCount = async () => {
  try {
    const res = await privateApiClient.get('/vendor/v1/get-vendor-count');
    return res.data;
  } catch (error) {
    return error
  }
}