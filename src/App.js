import React, { createContext, useState } from "react";
import './App.css';
import Heder from "./components/Heder/Heder";
import Shop from "./components/Shop/Shop";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Error from "./components/Error/Error";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/LogIn/Login";
import Shipment from "./components/Shipment/Shipment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [logInUser, setLogInUser] = useState({});

  return (
    <UserContext.Provider value={[logInUser, setLogInUser]}>
      <h3>email:{logInUser.email}</h3>
      <Heder></Heder>
      <Router>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review />} />
          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          <Route path="/shipment" element={<PrivateRoute><Shipment /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Shop />} />
          <Route path="/product/:productKey" element={<ProductDetail />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
