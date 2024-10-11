import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Signup from './components/Register';
import Login from './components/Login';
import Header from './components/Layout/Header';
// import AdminHeader from './components/Layout/AdminHeader'; // Admin-specific Header
import UserHome from './components/user/UserHome';
import AdminDashBoard from './components/admin/AdminDashBoard';
import BookForm from './components/pages/Book';
import ViewBook from './components/pages/ViewBook';
import ViewDetails from './components/pages/ViewDetails';
import Cart from './components/pages/Cart';
import OrderHistory from './components/Order';
import Banner from './components/Layout/Banner';
import AdminMenu from './components/admin/AdminDashBoard';
import AdminPage from './components/admin/AdminPage';
// import GetAllorders from './components/admin/GetAllorders';
import GetAllProducts from './components/admin/GetAllProducts';
import GetAllusers from './components/admin/GetAllusers';
import Editbook from './components/admin/Editbook';
import GetAllorders from './components/admin/GetAllorders';
import AdminProfile from './components/admin/AdminProfile';
import EditAdminProfile from './components/admin/EditAdminProfile';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './components/user/userProfile';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Render AdminHeader for admin routes, otherwise default Header */}
      {isAdminRoute ? <AdminMenu /> : <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Banner />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* User Home with Nested Routes */}
            <Route path="/home" element={<UserHome />} />
            <Route path="/viewbooks" element={<ViewBook />} />
            <Route path="/details/:id" element={<ViewDetails />} />
            <Route path="/cart/:bookId" element={<Cart />} />
            <Route path="/order/:userId" element={<OrderHistory />} />
            <Route path="/profile" element={<UserProfile />} />

            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<AdminPage/> } />
            <Route path="/dashboard/addbook/:userId" element={<BookForm />} />
            <Route path="/dashboard/editboook/:id" element={<Editbook/>}></Route>
            <Route path="/dashboard/getallproducts" element={<GetAllProducts/>}></Route>
            <Route path='/dashboard/getallusers'element={<GetAllusers/>}></Route>
            <Route path='/dashboard/getallorders' element={<GetAllorders/>}></Route>
            <Route path='/dashboard/adminprofile' element={<AdminProfile/>}></Route>
            <Route path='/dashboard/editprofile/:id' element={<EditAdminProfile/>}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
