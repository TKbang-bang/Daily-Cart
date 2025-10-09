import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { gettingProducts } from "../../../services/products.service";
import "./components.css";
import Product from "./Product";

function Products({ to }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await gettingProducts(to);
        if (!res.ok) throw new Error(res.message);

        setProducts(res.products);
      } catch (error) {
        return toast.error(error.message);
      }
    };

    getProducts();
  }, [to]);

  return (
    <div className="products">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
