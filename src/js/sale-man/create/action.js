import { CREATE_PR_REQUEST } from "./constants";

export function createPRAction({ data }) {
  return { type: CREATE_PR_REQUEST,data};
}

