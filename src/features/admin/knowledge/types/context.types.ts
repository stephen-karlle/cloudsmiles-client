

export type ContextRequestType = {
  _id?: string;
  contextType: string;
  contextLabel: string;
  contextData: string;
  contextCategory: string;
}

export type ContextResponseType = {
  contextSerialId: string;
  contextType: string;
  contextLabel: string;
  contextData: string;
  contextCategory: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}



export type RequestResponseType = {
  requestSerialId: string;
  requestLabel: string;
  requestStatus: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}