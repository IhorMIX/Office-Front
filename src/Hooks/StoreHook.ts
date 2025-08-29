import { useMemo } from "react";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { bindActionCreators } from "@reduxjs/toolkit";

import { actions } from "../redux/slices/auth";

const rootActions = {
  ...actions,
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(rootActions, dispatch) as typeof rootActions,
    [dispatch]
  );
};
