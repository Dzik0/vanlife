import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import Van from "./pages/Vans/Van";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import RentedVans from "./pages/Host/RentedVans";
import HostLayout from "./components/HostLayout";
import RentedVanHost from "./pages/Host/RentedVans/RentedVanHost";
import RentedVanDetails from "./pages/Host/RentedVans/RentedVanDetails";
import RentedVanPricing from "./pages/Host/RentedVans/RentedVanPricing";
import RentedVanPhotos from "./pages/Host/RentedVans/RentedVanPhotos";
import VansProvider from "./providers/VansProvider";
import WrongPage from "./pages/WrongPage";
import Login from "./pages/Account/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./providers/AuthProvider";
import Register from "./pages/Account/Register";
import Details from "./pages/Host/Details";
import Recover from "./pages/Account/Recover";

export default function App() {
  return (
    <AuthProvider>
      <VansProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="host" element={<HostLayout />}>
                  <Route index element={<Dashboard />} />

                  <Route path="income" element={<Income />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="vans" element={<RentedVans />} />
                  <Route path="details" element={<Details />} />
                  <Route path="vans/:id" element={<RentedVanHost />}>
                    <Route index element={<RentedVanDetails />} />
                    <Route path="pricing" element={<RentedVanPricing />} />
                    <Route path="photos" element={<RentedVanPhotos />} />
                  </Route>
                </Route>
              </Route>
              <Route path="about" element={<About />} />
              <Route path="vans" element={<Vans />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="recover" element={<Recover />} />
              <Route path="vans/:id" element={<Van />} />
              <Route path="*" element={<WrongPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </VansProvider>
    </AuthProvider>
  );
}
