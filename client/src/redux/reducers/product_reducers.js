import {
  GET_PRODUCT_BY_ARRIVAL,
  REQUEST_GET,
  GET_PRODUCT_BY_SELL,
  GET_BRANDS,
  ADD_BRANDS,
  ERROR,
  ADD_WOODS,
  GET_WOODS,
  GET_PRODUCT_TO_SHOP,
  ADD_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
} from '../actions/type';

const initialState = {
  loading: true,
  productDetail: {},
  productDetailLoading: true,
  bysell: {},
  byArrival: {},
  woods: {},
  brands: {},
  errors: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET:
      return {
        ...state,
        loading: true,
      }
    case GET_PRODUCT_BY_SELL:
      return {
        ...state,
        bySell: action.payload,
        loading: false,
      }
    case GET_PRODUCT_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload,
        loading: false,
      }
    case ADD_BRANDS:
      return {
        ...state,
        brands: action.payload,
        errors: action.errors,
      }
    case ADD_WOODS:
      return {
        ...state,
        woods: action.payload,
        loading: false,
      }
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
        loading: false,
      }
    case GET_WOODS:
      return {
        ...state,
        woods: action.payload,
        loading: false,
      }
    case GET_PRODUCT_TO_SHOP:
      return {
        ...state,
        toShop: action.articles,
        toShopSize: action.size,
      }
    case ADD_PRODUCT:
      return {
        ...state,
        loading: false,
        addProduct: action.payload,
      }
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
        productDetailLoading: false,
      }
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
        productDetailLoading: true,
      }
    case ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;