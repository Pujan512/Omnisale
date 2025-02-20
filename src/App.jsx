import Homepage from "./components/Homepage"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from 'react-router'
import ProductDesc from "./components/products/ProductDesc"
import ProductForm from "./components/products/ProductForm"
import { useState, useMemo, useEffect } from "react"
import { ProductContext, CategoryContext, CartContext, PointContext } from "./Context/OmniContext"
import Cart from "./components/Cart/Cart"
import SignUp from "./components/User/SignUp"
import Login from "./components/User/Login"
import LoginAdmin from "./components/Admin/LoginAdmin"
import User from "./components/User/User"
import Result from "./components/Payment/Result"
import PrivateRoute from "./components/PrivateRoute"
import SearchResults from "./components/products/SearchResults"
import ManageUser from "./components/User/ManageUser"
import BuyPoints from "./components/Payment/BuyPoints"
import ConfirmEmail from "./components/User/ConfirmEmail"
import ResetPassword from "./components/User/ResetPassword"
import ForgotPassword from "./components/User/ForgotPassword"
import Footer from "./components/Footer"
import Privacy from "./components/Static/Privacy"
import Terms from "./components/Static/Terms"
import NotFound from "./components/NotFound"
import Dashboard from "./components/Admin/Dashboard"
import PrivateAdminRoute from "./components/Admin/PrivateAdminRoute"

function App() {
  const [cart, setCart] = useState([]);
  const [point, setPoint] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const productContextValue = useMemo(() => ({ products, setProducts }), [products])

  const fetchProducts = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL_PRODUCT, {
      headers: {
        'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
      }
    });
    const data = await res.json()
    setProducts(data);
  }
  const fetchCategories = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL_CATEGORY, {
      headers: {
        'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
      }
    });
    const data = await res.json()
    setCategories(data);
  }
  const fetchCart = async (userId) => {
    const res = await fetch(import.meta.env.VITE_API_URL_CART + userId, {
      headers: {
        'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
      }
    });
    const data = await res.json()
    setCart(data.cartItems);
  }
  const fetchPoint = async (userId) => {
    const res = await fetch(import.meta.env.VITE_API_URL_POINT + userId, {
      headers: {
        'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
      }
    });
    const data = await res.json();
    setPoint(data.value);
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    if (document.cookie) {
      fetchCart(sessionStorage.getItem("user"));
      fetchPoint(sessionStorage.getItem("user"));
    }
  }, [])

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      <ProductContext.Provider value={productContextValue}>
        <CartContext.Provider value={{ cart, setCart }}>
          <PointContext.Provider value={{ point, setPoint }}>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/BuyPoints" element={<BuyPoints />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminLogin" element={<LoginAdmin />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/confirmEmail" element={<ConfirmEmail />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/product/:id" element={<ProductDesc />} />
                <Route path="/category/:id" element={<Homepage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

                <Route path="/payment" element={<PrivateRoute />}>
                  <Route index element={<Result />} />
                </Route>
                <Route path="/resetPassword" element={<PrivateRoute />}>
                  <Route index element={<ResetPassword />} />
                </Route>
                <Route path="/admin" element={<PrivateAdminRoute />}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/userSetting" element={<PrivateRoute />}>
                  <Route index element={<ManageUser />} />
                </Route>
                <Route path="/AddProd" element={<PrivateRoute />}>
                  <Route index element={<ProductForm />} />
                </Route>
                <Route path="/EditProd/:id" element={<PrivateRoute />}>
                  <Route index element={<ProductForm />} />
                </Route>
                <Route path="/cart" element={<PrivateRoute />}>
                  <Route index element={<Cart />} />
                </Route>
                <Route path="/inventory" element={<PrivateRoute />}>
                  <Route index element={<User />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </PointContext.Provider>
        </CartContext.Provider>
      </ProductContext.Provider>
    </CategoryContext.Provider>
  )
}

export default App
