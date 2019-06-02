import {
  REQUEST_POST,
  RECEIVE_POST,
  LOGIN,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEM_USER,
  INCREASE_QUANTITY_ITEM,
  DESCREASE_QUANTITY_ITEM,
  REMOVE_CART_ITEM_USER,
} from '../actions/type';


const initialState = {
  isAuth: false,
  loading: true,
  getCartLoading: true,
  lengthOfCart: 0,
  userData: {
    isAdmin: false,
    cartDetail: {}
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POST:
      return {
        ...state,
        loading: true,
      }
    case RECEIVE_POST:
      return {
        ...state,
        loading: false,
      }
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      }
    case AUTH_USER:
      return {
        ...state,
        userData: action.userData
      }
    case LOGOUT_USER:
      return {
        ...state,

      }
    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        }
      }
    case INCREASE_QUANTITY_ITEM:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      }
    case DESCREASE_QUANTITY_ITEM:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      }
    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        }
      }
    case GET_CART_ITEM_USER:
      return {
        ...state,
        getCartLoading: false,
        cartDetail: action.payload,
        totalPrice: action.totalPrice,
      }
    default:
      return state;
  }
}

export default userReducer;