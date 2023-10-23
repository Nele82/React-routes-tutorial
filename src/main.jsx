import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  Route, 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as loaderVans } from "./pages/Vans"
import VanDetails, { loader as loaderVanDetails } from './pages/VanDetails'
import Layout from './components/Layout'
import Dashboard, { loader as loaderDash } from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVanDetails, { loader as loaderHostVanDetails } from './pages/Host/HostVanDetails'
import HostVans, { loader as loaderHostVans } from './pages/Host/HostVans'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanPricing from './pages/Host/HostVanPricing'
import NotFound from './pages/NotFound'
import Error from './components/Error'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login'
import { requireAuth } from './utils'
import '../src/index.css'
import "./server"

const router = createBrowserRouter(createRoutesFromElements(
  <Route 
    path="/" 
    element={<Layout />}
    errorElement={<Error />} 
  >          
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route 
      path='login'
      element={<Login />}
      loader={loginLoader}
      action={loginAction}
    />
    <Route 
      path="vans" 
      element={<Vans />} 
      loader={loaderVans}
      errorElement={<Error />}
    />
    <Route 
      path="vans/:id" 
      element={<VanDetails />} 
      loader={loaderVanDetails}
      errorElement={<Error />}
    /> 

    <Route path="host" element={<HostLayout />} >
      <Route 
        index 
        element={<Dashboard />}
        loader={loaderDash}
      />
      <Route 
        path="income" 
        element={<Income />}
        loader={async ({request}) => await requireAuth(request)}
      />
      <Route 
        path="vans" 
        element={<HostVans />}
        loader={loaderHostVans} 
        errorElement={<Error />}
      />
      <Route 
        path="vans/:id" 
        element={<HostVanDetails />}
        loader={loaderHostVanDetails} 
        errorElement={<Error />}
      >              
        <Route 
          index 
          element={<HostVanInfo />}
          loader={async ({request}) => await requireAuth(request)}
        />
        <Route 
          path='pricing' 
          element={<HostVanPricing />}
          loader={async ({request}) => await requireAuth(request)}
        />
        <Route 
          path='photos' 
          element={<HostVanPhotos />} 
          loader={async ({request}) => await requireAuth(request)}
        />
      </Route>
      <Route 
        path="reviews" 
        element={<Reviews />} 
        loader={async ({request}) => await requireAuth(request)}
      />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
