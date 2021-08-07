import { GET_LOCATION_REQUEST } from "./constants";

export function getAllLocationsAction({ token }) {
  return { type: GET_LOCATION_REQUEST, token };
}
