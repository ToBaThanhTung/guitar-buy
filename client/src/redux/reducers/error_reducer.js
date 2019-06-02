import { ERROR, CLEAR_ERROR } from '../actions/type';

const initialState = {
  textError: '',
}

const errorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ERROR:
      return {
        textError: action.textError
      }
    case CLEAR_ERROR:
      return {
        textError: ''
      }
    default:
     return state;
  }
}

export default errorReducer;