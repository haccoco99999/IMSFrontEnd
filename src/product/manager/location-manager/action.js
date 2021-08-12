import {
  GET_ALL_LOCATIONS_REQUEST,
  CREATE_LOCATION_REQUEST,
  UPDATE_LOCATION_REQUEST,
} from "../constants";

export function getAllLocationsAction({ token, filter }) {
  return { type: GET_ALL_LOCATIONS_REQUEST, token, filter};
}
export function createLocationAction({ token, data }) {
  return { type: CREATE_LOCATION_REQUEST, token, data };
}
export function updateLocationAction({ token, data,needCheckName }) {
  return { type: UPDATE_LOCATION_REQUEST, token, data,needCheckName };
}
