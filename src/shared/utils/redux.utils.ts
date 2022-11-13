export interface ExtraReducerInterface {
  pending: any;
  fulfilled: any;
  rejected: any;
}

export interface StateReducerInterface {
  loading: boolean;
  error: string | null;
  success: boolean;
  data?: any | null;
  token?: string | null;
}

export const createDefaultExtraReducers = (reducer: ExtraReducerInterface) => {
  return {
    [reducer.pending]: (state: StateReducerInterface) => {
      state.loading = true;
      state.error = null;
    },
    [reducer.fulfilled]: (state: StateReducerInterface, _: any) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [reducer.rejected]: (state: StateReducerInterface, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    },
  };
};
