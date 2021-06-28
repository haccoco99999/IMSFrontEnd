import { CREATE_PR_REQUEST,CLEAR_MESSAGE } from "./constants";

export function createPRAction({ data,token }) {
  return { type: CREATE_PR_REQUEST,data,token};
}

export function clearMessageAction(){
return { type: CLEAR_MESSAGE}
}

