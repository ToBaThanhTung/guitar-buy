import axios from 'axios';
import {
  RECEIVE_POST,
  REQUEST_POST,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEM_USER,
  REMOVE_CART_ITEM_USER,
  INCREASE_QUANTITY_ITEM,
  DESCREASE_QUANTITY_ITEM,
} from './type';

import { USER_SERVER, PRODUCT_SERVER } from '../../utils/mics';

const requestPost = (userInput) => ({
  type: REQUEST_POST,
  userInput,
});

const receivePost = (userInput) => ({
  type: RECEIVE_POST,
  userInput,
});


const authUser = (userData) => ({
  type: AUTH_USER,
  userData: userData,
});

const addToCartAction = data => ({
  type: ADD_TO_CART_USER,
  payload: data
});

const getCartItemsAction = (artice, totalPrice) => ({
  type: GET_CART_ITEM_USER,
  payload: artice,
  totalPrice,
});

const removeCartItemAction = (data) => ({
  type: REMOVE_CART_ITEM_USER,
  payload: data,
});

const increaseQuantityAction = data => ({
  type: INCREASE_QUANTITY_ITEM,
  payload: data
});

const descreaseQuantityAction = data => ({
  type: DESCREASE_QUANTITY_ITEM,
  payload: data
});

export const registerAction = (userInput) => (dispatch) => {
  console.log(userInput);
  
  dispatch(requestPost(userInput));

  axios
    .post(`${USER_SERVER}/register`, userInput)
    .then(res => {
      // console.log(res.data);
      dispatch(receivePost(res.data))
    })
    .catch(err => {
      console.log('err', err);

    })
};

export const loginAction = (userInput) => async (dispatch) => {
  dispatch(requestPost(userInput));
  console.log(userInput);

  await axios
    .post(`${USER_SERVER}/login`, userInput, { withCredentials: true })
    .then(res => {
      console.log(res.data);
      dispatch(receivePost(res.data));
    })
    .catch(err => console.log(err));
}

export const auth = () => async dispatch => {
  await axios.get(`${USER_SERVER}/auth`, { withCredentials: true })
    .then(res => {
      dispatch(authUser(res.data));
      // console.log(res);

    }).catch(err => console.log('errrrr: ', err));

};


// LOG OUT
const logOutAction = (payload) => ({
  type: LOGOUT_USER,
  payload,
});

export const logOutUser = () => dispatch => {
  axios
    .get(`${USER_SERVER}/logout`)
    .then(res => {
      dispatch(logOutAction(res.data))
    })
    .catch(err => console.log(err));

}



// CART
export const addToCart = (id) => async dispatch => {
  await axios
    .post(`${USER_SERVER}/addToCart?productId=${id}`, {}, { withCredentials: true })
    .then(res => {
      console.log(res.data);
      dispatch(addToCartAction(res.data));
    })
};


export const increaseQuantity = (id) => async (dispatch, getState) => {
  await axios
    .post(`${USER_SERVER}/increaseQuantity?productId=${id}`, {}, { withCredentials: true })
    .then(res => {
      let userCart = res.data;
      let article = getState().user.cartDetail;
      console.log(article)
      article.forEach(item => {
        if (item._id == id) {
          item.quantity += 1;
        }
      })
      let totalPrice = calculatePrice(article);
      dispatch(increaseQuantityAction(userCart));
      dispatch(getCartItemsAction(article, totalPrice));

    })

}
// descreaseQuantity
export const decreaseQuantity = (id) => async (dispatch, getState) => {
  await axios
    .post(`${USER_SERVER}/decreaseQuantity?productId=${id}`, {}, { withCredentials: true })
    .then(res => {
      let userCart = res.data;
      let article = getState().user.cartDetail;
      console.log(article)
      article.forEach(item => {
        if (item._id == id && item.quantity >= 2) {
          item.quantity -= 1;
        }
      });
      let totalPrice = calculatePrice(article);
      dispatch(increaseQuantityAction(userCart));
      dispatch(getCartItemsAction(article, totalPrice));

    })
}

export const getCartItems = (cartItems, userCart) => async dispatch => {

  // get quantity from store
  // get product detail from server
  // => merge quantity and product

  console.log(cartItems, userCart);
  const request = `${PRODUCT_SERVER}articles_by_id?id=${cartItems}&type=array`;

  await axios
    .get(request, { withCredentials: true })
    .then(res => {
      let article = res.data;

      userCart.forEach(item => {
        article.forEach((k, indx) => {
          if (item.id === k._id) {
            article[indx].quantity = item.quantity;
          }
        });
      });
      // article.forEach((arti, i) => {
      //   article[i].sumPrice = calculatePrice(article);
      // })
      let totalPrice = calculatePrice(article);
      return dispatch(getCartItemsAction(article, totalPrice));
    });
};

export const removeCartItem = (id) => async dispatch => {
  try {
    await axios
      .get(`${USER_SERVER}/removeFromCart?_id=${id}`, { withCredentials: true })
      .then(res => {
        let article = res.data.cartDetail;
        // console.log(article);
        let listItemCart = res.data.cart;
        listItemCart.forEach(item => {
          article.forEach((k, indx) => {
            if (item.id === k._id) {
              article[indx].quantity = item.quantity;
            }
          });
        });

        let totalPrice = calculatePrice(res.data.cartDetail);
        dispatch(removeCartItemAction(listItemCart));
        dispatch(getCartItemsAction(article, totalPrice));

      });
  } catch (err) {
    console.log(err);
  }
}

// calculate sum price
const calculatePrice = (data) => {
  let sum = 0;
  data.forEach(item => {
    sum += item.price * item.quantity;
  });
  return sum;
}
