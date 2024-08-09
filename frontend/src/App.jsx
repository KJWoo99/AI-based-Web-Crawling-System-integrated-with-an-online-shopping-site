import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions'
import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotAuthRoutes from './components/NotAuthRoutes'
import HistoryPage from './pages/HistoryPage'
import CartPage from './pages/CartPage'
import DetailProductPage from './pages/DetailProductPage'
import ReviewPage from './pages/ReviewPage'
import QnAPage from './pages/QnAPage'
import ReviewPageAdmin from './pages/ReviewPage/Admin'
import QnAPageAdmin from './pages/QnAPage/Admin'

function Layout() {
  return (
    <div className='flex flex-col justify-between h-screen  ' >

      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main className='w-10/12 max-w-4xl mx-auto mb-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch])


  return (
    <Routes>
      <Route path='/' element={<Layout />} >

        <Route index element={<LandingPage />} />

        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/Qna" element={<QnAPage />} />
          <Route path="/review_admin_hidden" element={<ReviewPageAdmin />} />
          <Route path="/qna_admin_hidden" element={<QnAPageAdmin />} />
        </Route>

        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
