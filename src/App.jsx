import AR from './components/AR'
import './App.css'
import CameraAccess from './components/CameraAccess'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ImagePage from './pages/ImagePage'
import ARPage from './pages/ARPage'

function App() {

  return (
    <>
      <div className=''>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/image" element={<ImagePage />} />
          <Route path="/ar" element={<ARPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
