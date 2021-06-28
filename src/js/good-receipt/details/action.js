import { GET_GR_DETAILS_REQUEST } from "./constants";

export default function ({ id, token }) {
  return {
    type: GET_GR_DETAILS_REQUEST,
    id,
    token,
  };
}
