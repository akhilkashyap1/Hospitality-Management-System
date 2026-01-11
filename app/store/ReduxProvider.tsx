"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import type { ReactNode } from "react";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
