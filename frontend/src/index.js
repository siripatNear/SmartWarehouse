import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
// import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        {/* <Navbar/> */}
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
