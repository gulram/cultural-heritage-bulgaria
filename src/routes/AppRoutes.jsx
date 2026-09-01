import {
  lazy,
  Suspense,
} from 'react'

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import PageLoader from '../components/ui/PageLoader'

import HomePage from '../pages/HomePage'
import DestinationPage from '../pages/DestinationPage'

const MapPage = lazy(
  () => import('../pages/MapPage')
)

function AppRoutes() {
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
          <Suspense
            fallback={<PageLoader />}
          >
            <MapPage />
          </Suspense>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  )
}

export default AppRoutes