import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon, DeleteIcon, SwitchIcon } from "../../SVG/SVG";
import { toast } from "sonner";
import {
  gettingProductById,
  updateProduct,
} from "../../services/products.service";
import "./views.css";

function Edit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [tags, setTags] = useState("");
  const [productId, setProductId] = useState(useParams().id);
  const navigate = useNavigate();

  useEffect(() => {
    const gettingProduct = async () => {
      try {
        const res = await gettingProductById(`/products/${productId}`);
        if (!res.ok) throw new Error(res.message);

        setName(res.product.name);
        setDescription(res.product.description);
        setCategory(res.product.category);
        setPrice(res.product.price);
        setDiscount(res.product.discount || 0);
        setStock(res.product.stock);
        setTags(res.product.tags.map((tag) => tag).join(", "));
      } catch (error) {
        return toast.error(error.message);
      }
    };

    gettingProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(
        productId,
        name,
        description,
        category,
        price,
        discount,
        stock,
        tags
      );
      if (!res.ok) throw new Error(res.message);

      toast.success(res.message);
      return navigate("/products");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <section className="create">
      <button onClick={() => navigate(-1)} className="back">
        <ArrowBackIcon />
      </button>
      <form onSubmit={handleSubmit}>
        <article className="credentials">
          <input
            type="text"
            placeholder="Product Name"
            accept="image/*"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <button type="submit" className="submit">
            Update Product
          </button>
        </article>
      </form>
    </section>
  );
}

export default Edit;
