import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  product_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};
//const url = "https://course-api.com/react-store-products";
const url = "http://localhost:3000/products";
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  /////////////////////////
  // Sidebar functionality
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  /////////////////////////
  // Fetching products
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios(url);
      const singleProduct = response.data;
console.log(singleProduct) //added Console
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };
  //
  useEffect(() => {
    fetchProducts(url);
  }, []);
  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};