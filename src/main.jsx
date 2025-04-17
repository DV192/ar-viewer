import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/* <StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </StrictMode> */}
  </>,
)

/**
 * StrictMode is causing useEffect run twice.
 * Because of that MindARThree is mounted, then unmounted, then mounted again.
 * That's why we remove StrictMode.
 */
