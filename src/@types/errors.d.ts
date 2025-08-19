import { Dispatch } from "react";

export type PropsErrors = {
    error: Error | any;
    exclude: any[] = [];
    dispatch: Dispatch
  }