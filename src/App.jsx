import { useState, useMemo, useEffect, lazy } from "react"
import { BrowserRouter, Routes, Route } from 'react-router'
import { ProductContext, CategoryContext, CartContext, PointContext } from "./Context/OmniContext"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Loading from "./components/Loading"

const Homepage = lazy(() => import("./components/Homepage"));
const ProductDesc = lazy(() => import("./components/products/ProductDesc"));
const ProductForm = lazy(() => import("./components/products/ProductForm"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const SignUp = lazy(() => import("./components/User/SignUp"));
const Login = lazy(() => import("./components/User/Login"));
const LoginAdmin = lazy(() => import("./components/Admin/LoginAdmin"));
const User = lazy(() => import("./components/User/User"));
const Result = lazy(() => import("./components/Payment/Result"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const SearchResults = lazy(() => import("./components/products/SearchResults"));
const ManageUser = lazy(() => import("./components/User/ManageUser"));
const BuyPoints = lazy(() => import("./components/Payment/BuyPoints"));
const ConfirmEmail = lazy(() => import("./components/User/ConfirmEmail"));
const ResetPassword = lazy(() => import("./components/User/ResetPassword"));
const ForgotPassword = lazy(() => import("./components/User/ForgotPassword"));
const About = lazy(() => import("./components/Static/About"));
const Privacy = lazy(() => import("./components/Static/Privacy"));
const Terms = lazy(() => import("./components/Static/Terms"));
const NotFound = lazy(() => import("./components/NotFound"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const PrivateAdminRoute = lazy(() => import("./components/Admin/PrivateAdminRoute"));

function App() {
  const [cart, setCart] = useState([]);
  const [point, setPoint] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
      (async function(){  
        await fetchProducts();
        await fetchCategories();
        setLoading(false);
      })()
    if (document.cookie) {
      fetchCart(sessionStorage.getItem("user"));
      fetchPoint(sessionStorage.getItem("user"));
    }
    if (!document.cookie)
      sessionStorage.clear()
  }, [])

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      <ProductContext.Provider value={productContextValue}>
        <CartContext.Provider value={{ cart, setCart }}>
          <PointContext.Provider value={{ point, setPoint }}>
            <BrowserRouter>
              <Navbar />
              {loading ? <div className="main flex flex-1 items-center justify-center"><Loading /></div> :
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/BuyPoints" element={<BuyPoints />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/adminLogin" element={<LoginAdmin />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/confirmEmail" element={<ConfirmEmail />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route path="/product/:id" element={<ProductDesc />} />
                  <Route path="/category/:id" element={<Homepage />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/about" element={<About />} />

                  <Route path="/payment" element={<PrivateRoute />}>
                    <Route index element={<Result />} />
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
              }
              <Footer />
            </BrowserRouter>
          </PointContext.Provider>
        </CartContext.Provider>
      </ProductContext.Provider>
    </CategoryContext.Provider>
  )
}

export default App
