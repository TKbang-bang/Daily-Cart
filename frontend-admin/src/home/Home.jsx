import React from "react";
import { Route, Routes } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Home</h1>

      <Routes>
        <Route path="/products" element={<h1>Products</h1>} />
        <Route path="/create" element={<h1>Create Products</h1>} />
        <Route path="/orders" element={<h1>Orders</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/logs" element={<h1>Logs</h1>} />
      </Routes>
    </div>
  );
}

export default Home;
