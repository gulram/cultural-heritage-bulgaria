import {
  lazy,
  Suspense,
} from 'react'

import {
  Routes,
  Route,
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import DestinationPage from './pages/DestinationPage'

const MapPage = lazy(
  () => import('./pages/MapPage')
)

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/destinations/:slug"
        element={<DestinationPage />}
      />

      <Route
        path="/map"
        element={
          <Suspense fallback={null}>
            <MapPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App