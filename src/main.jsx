import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/* <StrictMode> */}
    <App />
    {/* </StrictMode> */}
  </>,
)

/**
 * StrictMode is causing useEffect run twice.
 * Because of that MindARThree is mounted, then unmounted, then mounted again.
 * That's why we remove StrictMode.
 */
