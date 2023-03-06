import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UsuariosContextProvider } from './contexts/usuarios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsuariosContextProvider>
      <App/>
    </UsuariosContextProvider>
  </React.StrictMode>,
)
