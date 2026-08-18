import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DestinationPage from './pages/DestinationPage'
import MapPage from './pages/MapPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/destinations/:slug" element={<DestinationPage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  )
}

export default App