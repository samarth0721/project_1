import React from "react";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catering from "./pages/Catering";
import Delivery from "./pages/Delivery";
import DineIn from "./pages/DineIn";
import Products from "./pages/Products";
import LoginCard from "./Components/LoginCard";
import SignUpCard from "./Components/SignUpCard";
import Cart from "./pages/Cart";
import ProfilePage from "./Components/ProfilePage";
import Footer from "./Components/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      {/* Layout wrapper for flex - pushes Footer to bottom */}
      <div className="app-layout">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/dinein" element={<DineIn />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/login" element={<LoginCard />} />
            <Route path="/signup" element={<SignUpCard />} />
            <Route path="/cart" element={<Cart addedProducts={cartItems} setCartItems={setCartItems} />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer /> {/* Now outside Routes - shows on all pages */}
      </div>
    </div>
  );
}

export default App;

// import React from "react";
// import { useState } from "react";
// import Navbar from "./Components/Navbar";
// import logo from './logo.svg';
// import './App.css';
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Catering from "./pages/Catering";
// import Delivery from "./pages/Delivery";
// import DineIn from "./pages/DineIn";
// import Products from "./pages/Products";
// import LoginCard from "./Components/LoginCard";
// import SignUpCard from "./Components/SignUpCard";
// import Cart from "./pages/Cart";
// import ProfilePage from "./Components/ProfilePage";
// import Footer from "./Components/Footer";

// function App() {
//   const [cartItems, setCartItems] = useState([]);

//   return (
//     <div className="App">
//       <div>
//       <Navbar></Navbar>
//       </div>
//       <Routes>
//         <Route path="/" element={<Home/>}></Route>
//         <Route path="/products" element={<Products cartItems={cartItems} setCartItems={setCartItems}/>}></Route>
//         <Route path="/delivery" element={<Delivery/>}></Route>
//         <Route path="/dinein" element={<DineIn/>}></Route>
//         <Route path="/catering" element={<Catering/>}></Route>
//         <Route path="/login" element={<LoginCard/>}></Route>
//         <Route path="/signup" element={<SignUpCard/>}></Route>
//         <Route path="/cart" element={<Cart addedProducts={cartItems} setCartItems={setCartItems} />}></Route>
//         <Route path="/profile" element={<ProfilePage/>}></Route>
//         <Footer />
//       </Routes>
//     </div>
//   );
// }

// export default App;
