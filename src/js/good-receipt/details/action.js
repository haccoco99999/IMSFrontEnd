import { GET_GR_DETAILS_REQUEST } from "./constants";

export default function ({ id }) {
  return {
    type: GET_GR_DETAILS_REQUEST,
    id,
  };
}
