import { Dispatch } from "react";

export type PropsErrorBoundary = {
  error: Error;
  resetError: () => void
}

export type PropsAppStack = {
  state: any;
  dispatch: Dispatch
}