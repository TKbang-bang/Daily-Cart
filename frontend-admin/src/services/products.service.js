import api from "./api.service";

export const createProduct = async (
  name,
  description,
  category,
  price,
  stock,
  tags,
  file
) => {
  try {
    const allTags = tags.split(",").map((tag) => tag.trim());
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("tags", JSON.stringify(allTags));
    formData.append("image", file);

    const res = await api.post("/products", formData);
    if (res.status != 200) return { ok: false, message: res.data.message };

    return { ok: true, message: res.data.message };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
