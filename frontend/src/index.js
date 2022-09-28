import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { router } from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);


