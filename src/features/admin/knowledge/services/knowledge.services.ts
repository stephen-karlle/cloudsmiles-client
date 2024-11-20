import { privateApiClient } from "@constants/api.constants"
import { ContextRequestType } from "../types/context.types";

export const ingestContext = async (data: ContextRequestType ) => {
  try {
    const res = await privateApiClient.post('/agent/v1/ingest-context', data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
export const ingestContextFromRequest = async (data: ContextRequestType ) => {
  try {
    const res = await privateApiClient.post('/agent/v1/ingest-context-from-request', data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateContext = async (data: ContextRequestType ) => {
  try {
    const res = await privateApiClient.put('/agent/v1/update-context', data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteContext = async (id: string ) => {
  try {
    const res = await privateApiClient.delete(`/agent/v1/delete-context/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteRequest = async (id: string ) => {
  try {
    const res = await privateApiClient.delete(`/agent/v1/delete-request/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const getContexts = async () => {
  try {
    const res = await privateApiClient.get('/agent/v1/get-contexts');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const getRequests = async () => {
  try {
    const res = await privateApiClient.get('/agent/v1/get-requests');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const getKnowledgeCount = async () => {
  try {
    const res = await privateApiClient.get('/agent/v1/get-knowledge-count');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}