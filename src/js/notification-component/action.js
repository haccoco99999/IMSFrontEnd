import { GET_ALL_NOTIFICATIONS_REQUEST } from "./constant";

export function getAllLocationsAction({ token,userRole }) {
  return { type: GET_ALL_NOTIFICATIONS_REQUEST, token,userRole };
}
