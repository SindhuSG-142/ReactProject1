import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { AuthContextProvider } from "./components/Context/AuthContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
// reportWebVitals();