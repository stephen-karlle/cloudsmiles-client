import { privateApiClient } from "@constants/api.constants";
import { OrderReceiveType, OrderType } from "../types/order.types"


export const createOrder = async (data: OrderType) => {
  try {
    const res = await privateApiClient.post('/stock/v1/create-order', data)
    return res.data
  } catch (error) {
    return error
  }
}

export const getOrders = async () => {
  try {
    const res = await privateApiClient.get('/stock/v1/get-orders')
    return res.data
  } catch (error) {
    return error
  }
}

export const receieveOrder = async (data: OrderReceiveType) => {
  try {
    const res = await privateApiClient.post('/stock/v1/receive-order', data)
    return res.data
  } catch (error) {
    return error
  }
}

export const deleteOrder = async (orderId: string) => {
  try {
    const res = await privateApiClient.delete(`/stock/v1/delete-order/${orderId}`)
    return res.data
  } catch (error) {
    return error
  }
}

export const updateOrder = async (data: OrderType) => {
  try {
    const res = await privateApiClient.put('/stock/v1/update-order', data)
    return res.data
  } catch (error) {
    return error
  }
}