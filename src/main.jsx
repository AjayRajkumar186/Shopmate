import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./Store/store";

import { AuthProvider } from "./components/context/AuthContext";
import { CartProvider } from "./components/context/CartContext";
import { OrderProvider } from "./components/context/OrderContext";
import { ProductProvider } from "./components/context/ProductContext";
import { NotificationProvider } from "./components/context/NotificationContext";
import ScrollToTop from "./components/layout/ScrollToTop";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <NotificationProvider>
              <BrowserRouter>
                <ScrollToTop />
                <App />
              </BrowserRouter>
            </NotificationProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  </Provider>
);
