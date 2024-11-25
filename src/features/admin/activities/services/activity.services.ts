import { privateApiClient } from "@constants/api.constants"
import { ActivityRequestType } from "../types/activity.types"

export const getActivities = async () => {
  try {
    const res = await privateApiClient.get('/activity/v1/get-activities')
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const createActivity = async (data: ActivityRequestType ) => {
  try {
    const res = await privateApiClient.post('/activity/v1/create-activity', data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getActivityCount = async () => {
  try {
    const res = await privateApiClient.get('/activity/v1/get-activity-count')
    return res.data
  } catch (error) {
    console.log(error)
  }
}