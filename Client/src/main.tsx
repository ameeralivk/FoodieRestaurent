import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './Components/Component/ErrorBoundary.tsx'
createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
  <BrowserRouter>
     <StrictMode>
    <App />
    </StrictMode>
  </BrowserRouter>
  </ErrorBoundary>
)
