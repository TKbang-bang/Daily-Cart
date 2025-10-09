import React from "react";
import { useParams } from "react-router-dom";
import Products from "./components/Products";

function Search() {
  const { search } = useParams();

  return (
    <div className="search_container">
      <Products to={`/products/search/${search}`} />
    </div>
  );
}

export default Search;
