import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './Components/Component/ErrorBoundary.tsx'
import { GoogleAuthWrapper } from './Components/Component/googleAuthProvider.tsx'
import { store } from './redux/store/store.ts'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <GoogleAuthWrapper>
  <Provider store={store}>
  <ErrorBoundary>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ErrorBoundary>
  </Provider>
</GoogleAuthWrapper>
</StrictMode>
)
