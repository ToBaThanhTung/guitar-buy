import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from './type';

export const openSnackbarAction = (msg) => ({
  type: OPEN_SNACKBAR,
  msg,
});

export const closeSnackbarAction = () => ({
  type: CLOSE_SNACKBAR
});

