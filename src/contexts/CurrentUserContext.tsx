import { createContext, Dispatch, SetStateAction } from "react";

export type CurrentUser = {
  id: string;
  firstname: string;
  lastname: string;
};

export interface CurrentUserContextInterface {
  currentUser: CurrentUser;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser>>;
}

const defaultState = {
  currentUser: {
    id: "",
    firstname: "",
    lastname: "",
  },
  setCurrentUser: (currentUser: CurrentUser) => {
    console.log(currentUser);
  },
} as CurrentUserContextInterface;

export const CurrentUserContext = createContext(defaultState);
