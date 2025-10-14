import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Products from "./components/Products";
import { ArrowBackIcon } from "../../SVG/SVG";
import "./views.css";

function Search() {
  const { search } = useParams();
  const navigate = useNavigate();

  return (
    <div className="search_container">
      <button onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </button>
      <Products to={`/products/search/${search}`} />
    </div>
  );
}

export default Search;
