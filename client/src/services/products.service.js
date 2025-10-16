import api from "./api.service";

export const getAllProducts = async (url) => {
  try {
    const res = await api.get(`${url}`);
    if (res.status != 200) return { ok: false, message: res.data.message };

    return { ok: true, products: res.data.products };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const gettingCategories = async () => {
  try {
    const res = await api.get("/products/categories");
    if (res.status != 200) return { ok: false, message: res.data.message };

    return { ok: true, categories: res.data.categories };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
