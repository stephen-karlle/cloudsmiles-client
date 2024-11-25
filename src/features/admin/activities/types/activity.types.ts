import { AssistantResponseType } from "@features/admin/staff/types/assistant.types";

export type ActivityType = {
  activitySerialId: string;
  activityAssistantId: AssistantResponseType
  activityDescription: string;
  activityAction: string;
  createdAt: string;
  updatedAt: string;
}

export type ActivityRequestType = {
  activityAssistantId: string
  activityDescription: string;
  activityAction: string;
}
