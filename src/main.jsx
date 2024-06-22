import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme.js'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
    </UserProvider>
  </React.StrictMode>,
)
