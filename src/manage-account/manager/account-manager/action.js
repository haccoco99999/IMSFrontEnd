import { GET_ALL_ACCOUNT_REQUEST } from "../../constants";

export default function action({ filter, token }) {
  return {
    type: GET_ALL_ACCOUNT_REQUEST,
    filter,
    token,
  };
}
