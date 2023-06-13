import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

export const logIn = createAction<string>("LOG_IN");
export const logOut = createAction("LOG_OUT");

interface UserState {
  profile: string | null;
}

const storedUser = localStorage.getItem("profile");
const user: UserState =
  storedUser !== null
    ? (JSON.parse(storedUser) as UserState)
    : { profile: null };

const initialState: UserState = user;

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(logIn, (state, action: PayloadAction<string>) => {
    state.profile = action.payload;
  });
  builder.addCase(logOut, (state) => {
    state.profile = null;
  });
});

export default userReducer;
