import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import BrandAdd from "./pages/Brand/BrandAdd";
import BrandList from "./pages/Brand/BrandList";
import EditBrand from "./pages/Brand/EditBrand";
//import AddressList from "./pages/Address/AddressList";
//import AddressAdd from "./pages/Address/AddressAdd";
//import AddressEdit from "./pages/Address/AddressEdit";
import CategoryList from "./pages/Category/CategoryList";
import CategoryAdd from "./pages/Category/CategoryAdd";
import CategoryEdit from "./pages/Category/CategoryEdit";
import ProductList from "./pages/Product/ProductList";
import ProductAdd from "./pages/Product/ProductAdd";
import ProductEdit from "./pages/Product/ProductEdit";
import ReviewList from "./pages/Review/ReviewList";
import ReviewAdd from "./pages/Review/ReviewAdd";
import ReviewEdit from "./pages/Review/ReviewEdit";
import CustomerList from "./pages/Customer/CustomerList";
import CustomerAdd from "./pages/Customer/CustomerAdd";
import CustomerEdit from "./pages/Customer/CustomerEdit";
import StaffList from "./pages/Staff/StaffList";
import StaffAdd from "./pages/Staff/StaffAdd";
import StaffEdit from "./pages/Staff/StaffEdit";
import OrderCreate from "./pages/Order/OrderCreate";
import OrderList from "./pages/Order/OrdersList";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PaymentList from "./pages/Payment/PaymentList";
import Home from "./pages/Home/Home";
import ProductOverview from "./pages/Product/ProductOverview";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/brands/edit/:id" exact element={<EditBrand />} />
        <Route path="/brands/add" exact element={<BrandAdd />} />
        <Route path="/brands" exact element={<BrandList />} />


        <Route path="/category/edit/:id" exact element={<CategoryEdit />} />
        <Route path="/category/add" exact element={<CategoryAdd />} />
        <Route path="/category" exact element={<CategoryList />} />

        <Route path="/product/edit/:id" exact element={<ProductEdit />} />
        <Route path="/product/add" exact element={<ProductAdd />} />
        <Route path="/product/overview/:id" exact element={<ProductOverview />} />
        <Route path="/product" exact element={<ProductList />} />

        <Route path="/review/edit/:id" exact element={<ReviewEdit />} />  
        <Route path="/review/add/:id" exact element={<ReviewAdd />} />
        <Route path="/review" exact element={<ReviewList />} />

        <Route path="/customer/edit/:id" exact element={<CustomerEdit />} />  
        <Route path="/customer/add" exact element={<CustomerAdd />} />
        <Route path="/customer" exact element={<CustomerList />} />

        <Route path="/staff/edit/:id" exact element={<StaffEdit />} />  
        <Route path="/staff/add" exact element={<StaffAdd />} />
        <Route path="/staff" exact element={<StaffList />} />

        <Route path="/order/create" exact element={<OrderCreate />} />
        <Route path="/orders" exact element={<OrderList />} />

        <Route path="/payments" exact element={<PaymentList />} />

        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />

        <Route path="/" exact element={<Home />} />
        
        <Route path="*" element={<><h1>Not found</h1></>} />
      </Routes>
    </div>
  );
}

export default App;