import { createSlice } from "@reduxjs/toolkit";

import { getValue, setValue, removeItem } from "../../Helpers/LocalStorageHelper"

import { IsNullOrEmpty } from "../../Helpers/StringHelper";
import { IReduxAuthModel } from "../../types/Redux";
import { IAuthInformation } from "../../types/AuthInfo"
import { AccessKey, RefreshToken, Role } from "../../Helpers/Constants";

const accessKey = getValue(AccessKey);
const refreshToken = getValue(RefreshToken);
const role = getValue(Role);
const initialState: IReduxAuthModel = {
  isAuth: !IsNullOrEmpty(accessKey),
  accessKey: accessKey,
  refreshToken: refreshToken,
  role: role
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state: IReduxAuthModel) => {
      state.isAuth = false;
      removeItem(AccessKey);
      removeItem(RefreshToken);
      removeItem(Role)
    },
    userLogin: (state: IReduxAuthModel, action: { payload: IAuthInformation }) => {
      state.isAuth = !IsNullOrEmpty(action.payload.accessKey);
      state.accessKey = action.payload.accessKey;
      state.refreshToken = action.payload.refresh_token;
      state.role = action.payload.role;
      setValue(AccessKey, action.payload.accessKey);
      setValue(RefreshToken, action.payload.refresh_token);
      setValue(Role, action.payload.role);
    }
  }
});

export const { actions, reducer } = authSlice;