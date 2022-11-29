import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Components
import AuthContext from "./context/AuthContext";
import PrivateRoutes from './components/PrivateRoutes'
import Search from "./components/Search";
import CreatePost from "./components/CreatePost";
// Logged-out pages
import Login from './pages/logged-out/Login'
import Registration from './pages/logged-out/Registration'
import PasswordReset from './pages/logged-out/PasswordReset'
import Activation from "./pages/logged-out/Activation";
// Logged-in pages
import Topbar from "./components/Topbar";
import AccountPage from './pages/logged-in/AccountPage'
import DiscoverPage from './pages/logged-in/DiscoverPage'
import HomePage from './pages/logged-in/HomePage'
import ProfilePage from './pages/logged-in/ProfilePage'

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col">
      <ToastContainer autoClose={1500} pauseOnFocusLoss={false} pauseOnHover={false} theme="dark" />

      <BrowserRouter>
        <Search />
        <CreatePost />

        {!!user && <Topbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path='/password-reset' element={<PasswordReset />} />
          <Route path='active/:username' element={<Activation />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path='/' exact element={<HomePage />} />
            <Route path='/profile/:username' element={<ProfilePage />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  )
}