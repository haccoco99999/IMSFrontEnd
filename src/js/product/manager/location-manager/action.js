import { GET_ALL_LOCATIONS_REQUEST } from "../constants";

export function getALlLocationsAction({ token, currentPage, sizePerPage }) {
  return { type: GET_ALL_LOCATIONS_REQUEST, token, currentPage, sizePerPage };
}
