import userReducer from './user_reducer';
import snackbarReducer from './snackbar_reducer';
import productReducer from './product_reducers'
import errorReducer from './error_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  snackbar: snackbarReducer,
  errors: errorReducer
});

export default rootReducer;