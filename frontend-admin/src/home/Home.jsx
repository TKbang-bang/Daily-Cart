import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import CreateProducts from "./Views/CreateProducts";

function Home() {
  return (
    <div className="home">
      <Header />

      <Routes>
        <Route path="/products" element={<h1>Products</h1>} />
        <Route path="/create" element={<CreateProducts />} />
        <Route path="/orders" element={<h1>Orders</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/logs" element={<h1>Logs</h1>} />
      </Routes>
    </div>
  );
}

export default Home;
