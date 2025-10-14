import React, { useState } from "react";
import { OrdersIcon, SearchIcon } from "../../SVG/SVG";
import { Route, Routes, useNavigate } from "react-router-dom";
import Products from "./components/Products";
import Search from "./Search";
import "./views.css";

function ProductsContainer() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search) {
      navigate(`/products/search/${search}`);
      setSearch("");
    }
  };

  return (
    <section className="products_container">
      <article className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <SearchIcon />
          </button>
        </form>
      </article>

      <Routes>
        <Route path="/products" element={<Products to={"/products"} />} />
        <Route path="/products/search/:search" element={<Search />} />
      </Routes>
    </section>
  );
}

export default ProductsContainer;
