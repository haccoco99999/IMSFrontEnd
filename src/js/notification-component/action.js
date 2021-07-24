import { GET_ALL_NOTIFICATIONS_REQUEST } from "./constant";

export function getAllLocationsAction({ token }) {
  return { type: GET_ALL_NOTIFICATIONS_REQUEST, token };
}
