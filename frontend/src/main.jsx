import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="321116751905-dt9net2888u407u0g23ek2r6a2uu44qe.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)