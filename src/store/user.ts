import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const logIn = createAction<string>("LOG_IN");
export const logOut = createAction("LOG_OUT");

interface UserState {
  profile: string | null;
}

const token = Cookies.get("token");
let storedUser = token ? jwt_decode(token) : null;

const user: UserState =
  storedUser !== null
    ? (JSON.parse(JSON.stringify(storedUser)) as UserState)
    : { profile: null };

const initialState: UserState = user;

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(logIn, (state, action: PayloadAction<string>) => {
    state.profile = action.payload;
  });
  builder.addCase(logOut, (state) => {
    return { ...state, profile: null };
  });
});

export default userReducer;
