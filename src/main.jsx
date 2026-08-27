import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  BrowserRouter,
} from 'react-router-dom'

import ScrollToTop from './components/layout/ScrollToTop.jsx'

import './index.css'
import './i18n'

import App from './App.jsx'

createRoot(
  document.getElementById('root')
).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
)