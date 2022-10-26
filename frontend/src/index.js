import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query";
// import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          {/* <Navbar/> */}
          <App />
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
