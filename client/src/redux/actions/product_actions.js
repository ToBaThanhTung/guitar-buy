import axios from 'axios';
import {
  GET_PRODUCT_BY_SELL,
  REQUEST_GET,
  GET_PRODUCT_BY_ARRIVAL,
  ADD_BRANDS,
  ADD_WOODS,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCT_TO_SHOP,
  ADD_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
} from './type';
import { PRODUCT_SERVER } from '../../utils/mics';
import { openSnackbarAction, closeSnackbarAction } from './snackbar_action';




const getProductsBySellAction = (payload) => ({
  type: GET_PRODUCT_BY_SELL,
  payload,
});

const getProductsByArrivalAction = (payload) => ({
  type: GET_PRODUCT_BY_ARRIVAL,
  payload,
});

const requestGET = () => ({
  type: REQUEST_GET,
});

const addBrandsAction = (payload) => ({
  type: ADD_BRANDS,
  payload,
})

const getBrandsAction = (payload) => ({
  type: GET_BRANDS,
  payload,
});

const addWoodsAction = (payload) => ({
  type: ADD_WOODS,
  payload,
})

const getWoodsAction = (payload) => ({
  type: GET_WOODS,
  payload,
})

const getProductDetailAction = payload => ({
  type: GET_PRODUCT_DETAIL,
  payload,
});





//

export const getProductsBySell = () => async dispatch => {
  dispatch(requestGET());
  // ?sortBy=sold&order=desc&limit=100
  await axios
    .get(`${PRODUCT_SERVER}articles/?sortBy=sold&order=desc&limit=9`)
    .then(res => {
      console.log(res.data);
      dispatch(getProductsBySellAction(res.data));
    })
    .catch(err => console.log(err));
}


export const getProductsByArrival = () => async dispatch => {
  dispatch(requestGET());
  //articles?sortBy=createdAt&order=desc&limit=4
  await axios
    .get(`${PRODUCT_SERVER}articles?sortBy=createdAt&order=desc&limit=9`)
    .then(res => {
      dispatch(getProductsByArrivalAction(res.data));

    })
    .catch(err => console.log(err));
}


// categories
export const getBrands = () => async dispatch => {
  dispatch(requestGET());
  await axios
    .get(`${PRODUCT_SERVER}brands/`)
    .then(res => {
      dispatch(getBrandsAction(res.data));
    })
};

export const addBrands = (existingBrands, newBrandsName) => async dispatch => {
  const config = { withCredentials: true }
  try {
    // console.log('new brand name', newBrandsName);

    await axios
      .post(`${PRODUCT_SERVER}brand/`, newBrandsName, config)
      .then(res => {
        console.log(res.data);
        if (res.data.success === false) {
        
        }
        else {
          const payload = [
            ...existingBrands,
            res.data.brand,
          ]
          dispatch(addBrandsAction(payload))
          dispatch(openSnackbarAction('add new brand successfuly!'))
        }
      })
      .catch(err => { console.log(err) })
  } catch (err) {
    console.log(err);
  }
}

export const addWoods = (existingWoods, newWoodsName) => async dispatch => {
  const config = { withCredentials: true }
  try {
    // console.log('new brand name', newBrandsName);
    await axios
      .post(`${PRODUCT_SERVER}wood/`, newWoodsName, config)
      .then(res => {
        console.log('data', res.data);
        const payload = [
          ...existingWoods,
          res.data.wood,
        ]
        dispatch(addWoodsAction(payload))
      })
      .catch(err => { console.log(err) })
  } catch (err) {
    console.log(err);
  }
}



export const getWoods = () => async dispatch => {
  dispatch(requestGET());
  await axios
    .get(`${PRODUCT_SERVER}woods`)
    .then(res => {
      dispatch(getWoodsAction(res.data));
    })
};


const getProductsToShopAction = (size, articles) => ({
  type: GET_PRODUCT_TO_SHOP,
  size,
  articles
});

export const getProductsToShop = (
  skip,
  limit,
  filters = [],
  previousState = []
) => async dispatch => {
  dispatch(requestGET());
  const data = {
    skip,
    limit,
    filters
  }
  await axios
    .post(`${PRODUCT_SERVER}shop`, data)
    .then(res => {
      let newState = [
        ...previousState,
        ...res.data.articles,
      ]
      dispatch(getProductsToShopAction(res.data.size, newState));
    })
}

const addProductAction = (payload) => ({
  type: ADD_PRODUCT,
  payload
});



export const addProduct = (data) => async dispatch => {
  dispatch(requestGET());
  console.log(data);

  await axios
    .post(`${PRODUCT_SERVER}article`, data, { withCredentials: true })
    .then(res => {
      console.log(res);

      dispatch(addProductAction(res.data))
    })
    .catch(err => console.log(err));
};

export const getProductDetail = (id, cb)=> async dispatch => {
  dispatch(requestGET());
  try {
    await axios
      .get(`${PRODUCT_SERVER}articles_by_id?id=${id}&type=single`)
      .then(res => {
        // console.log(res.data.article[0]);
        if(!res.data) {
          return cb(notFoundId => notFoundId ===  true)
        }
        const payload = res.data[0];
        dispatch(getProductDetailAction(payload));
      });
  } catch(err) {
    console.log(err);
  }
};

export const clearProductDetail = () => dispatch => {
  dispatch({
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  });
}