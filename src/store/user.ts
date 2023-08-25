import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface UserState {
  id: string;
  email: string;
  profileCompleted?: string;
}

export const logIn = createAction<UserState>("LOG_IN");
export const logOut = createAction("LOG_OUT");

const token = Cookies.get("token");

const user: UserState = token
  ? (jwt_decode(token) as UserState)
  : { id: "", email: "", profileCompleted: "" };

const initialState: UserState = user;

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(logIn, (state, action: PayloadAction<UserState>) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    })
    .addCase(logOut, () => {
      return { id: "", email: "", profileCompleted: "" };
    });
});

export default userReducer;
