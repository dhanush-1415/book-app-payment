// import React from 'react'
// import { Route, Routes, BrowserRouter } from 'react-router-dom'
// import Home from './PAGES/HomePage/Home'
// import './App.css'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ProductPage from './PAGES/Product/ProductPage';
// import About from './PAGES/ExtraPages/About';
// import Login from './PAGES/Auth/Login';
// import Signup from './PAGES/Auth/Signup';
// import UserProfile from './PAGES/User/UserProfile';
// import ForgotPassword from './PAGES/Auth/ForgotPassword';
// import Home1 from './PAGES/HomePage/Home1';
// import Checkout from './PAGES/Checkout/Checkout';
// import Sucess from './PAGES/Checkout/Sucess';
// import Cancel from './PAGES/Checkout/Cancel';
// import Contact from './PAGES/ExtraPages/Contact';
// import SearchPage from './PAGES/Search/SearchPage';
// import SearchPage1 from './PAGES/Search/SearchPage1';
// import TnCPrivacy from './PAGES/ExtraPages/TnCPrivacy';
// import PaymentPage from './PAGES/Payment/PaymentPage';
// import SearchResults from './PAGES/Search/SearchResults';
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home1 />} />
//         <Route path="/home/:categoryid/:categoryname/:subcategory" element={<Home1 />} />
//         <Route path="/product/:prodid"
//           element={
//             <ProductPage />
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route  path='/sucess' element={<Sucess />}/>
//       <Route  path='/cancel' element={<Cancel />}/>
//         <Route path="/user/:activepage" element={<UserProfile />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/privacy-tnc' element={<TnCPrivacy />} />
//         <Route path='/contact' element={<Contact />} />
//         {/* <Route path="/search" component={SearchResults} /> */}
//         <Route path="/search/:searchvalue" element={<SearchPage />} />
//         <Route path="/searchbycategory/:categoryid/:categoryname/:subcategory" element={<SearchPage1 />} />
//         <Route path='/payment' element={<PaymentPage />} />
//         <Route path="*" element={<div>
//           <h1>404 NOT FOUND</h1>
//         </div>} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App
import React, { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './PAGES/HomePage/Home';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductPage from './PAGES/Product/ProductPage';
import About from './PAGES/ExtraPages/About';
import Login from './PAGES/Auth/Login';
import Signup from './PAGES/Auth/Signup';
import UserProfile from './PAGES/User/UserProfile';
import ForgotPassword from './PAGES/Auth/ForgotPassword';
import Home1 from './PAGES/HomePage/Home1';
import Checkout from './PAGES/Checkout/Checkout';
import Success from './PAGES/Checkout/Success';
import Failed  from './PAGES/Checkout/failed';
import Cancel from './PAGES/Checkout/Cancel';
import Contact from './PAGES/ExtraPages/Contact';
import SearchPage from './PAGES/Search/SearchPage';
import SearchPage1 from './PAGES/Search/SearchPage1';
import TnCPrivacy from './PAGES/ExtraPages/TnCPrivacy';
import PaymentPage from './PAGES/Payment/PaymentPage';
import SearchResults from './PAGES/Search/SearchResults';
import AllProduct from './COMPONENTS/Product/AllProduct';  // Import the AllProduct component
// const Home1 = lazy(() => import('./PAGES/HomePage/Home1'));
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/search/" element={<Home1 />} />
        {/* <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home1 /></Suspense>} />
        <Route path="/home/:categoryid/:categoryname/:subcategory" element={<Suspense fallback={<div>Loading...</div>}><Home1 /></Suspense>} /> */}
        <Route path="/home/:Categoryshorturl/:Subcatgeoryshorturl/:level3Subcategory" element={<Home1 />} />
        <Route path="/product/:prodid" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/success' element={<Success />} />
        <Route path='/failed' element={<Failed />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path="/user/:activepage" element={<UserProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path='/about' element={<About />} />
        <Route path='/privacy-tnc' element={<TnCPrivacy />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/search/:searchvalue" element={<SearchPage />} />
        <Route path="/searchbycategory/:categoryid/:categoryname/:subcategory" element={<SearchPage1 />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path="/products/:searchValue" element={<AllProduct />} />
        <Route path="*" element={<div><h1>404 NOT FOUND</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
