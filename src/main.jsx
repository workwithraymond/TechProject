import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

//
//

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_REACT_APP_AUTH_DOMAIN}
    clientId={import.meta.env.VITE_REACT_APP_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
