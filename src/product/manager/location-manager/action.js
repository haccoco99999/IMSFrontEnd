import {
  GET_ALL_LOCATIONS_REQUEST,
  CREATE_LOCATION_REQUEST,
  UPDATE_LOCATION_REQUEST,
} from "../constants";

export function getAllLocationsAction({ token, currentPage, sizePerPage }) {
  return { type: GET_ALL_LOCATIONS_REQUEST, token, currentPage, sizePerPage };
}
export function createLocationAction({ token, data }) {
  return { type: CREATE_LOCATION_REQUEST, token, data };
}
export function updateLocationAction({ token, data }) {
  return { type: UPDATE_LOCATION_REQUEST, token, data };
}
