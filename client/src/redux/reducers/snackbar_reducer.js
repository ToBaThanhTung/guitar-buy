import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/type';

const initState = {
  open: false,
  msg: '',
}

const snackbarReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        open: true,
        msg: action.msg
      }
    case CLOSE_SNACKBAR:
      return {
        open: false,
        msg: '',
      }
    default:
      return state;
  }
}

export default snackbarReducer;