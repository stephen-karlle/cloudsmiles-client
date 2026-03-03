import axios from "axios";


export const serverUrl = 'https://cloudsmiles-server-lrwc.onrender.com';

export const publicApiClient = axios.create({
  baseURL: serverUrl,
  withCredentials: true
});


export const privateApiClient = axios.create({
  baseURL: serverUrl,
  withCredentials: true
});







export const authWithGoogle = serverUrl + "auth/v1/google"

