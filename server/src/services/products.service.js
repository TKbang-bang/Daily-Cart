const { Op, where } = require("sequelize");
const { sequelize, Category, Product, Tag, Log } = require("../../models");

const creatingProduct = async ({
  name,
  description,
  category,
  price,
  stock,
  tags,
  filename,
  userId,
}) => {
  try {
    await sequelize.transaction(async (transaction) => {
      let categoryId;
      // creating category
      const getCategory = await Category.findOne({
        where: {
          name: { [Op.iLike]: category },
        },
        transaction,
      });
      if (!getCategory) {
        const newCategory = await Category.create(
          { name: category },
          {
            transaction,
          }
        );
        categoryId = newCategory.id;
      } else {
        categoryId = getCategory.id;
      }

      // creating product
      const product = await Product.create(
        {
          name,
          description,
          categoryId,
          price,
          stock,
          image: filename,
        },
        {
          transaction,
        }
      );

      // creating products tags
      for (let tagName of tags) {
        const [tag] = await Tag.findOrCreate({
          where: { name: tagName },
          transaction,
        });

        await product.addTag(tag, { transaction });
      }

      await Log.create({
        userId,
        action: "created a product",
      });
    });
  } catch (error) {
    throw error;
  }
};

const updatingProduct = async ({
  id,
  name,
  description,
  category,
  price,
  discount,
  stock,
  tags,
  userId,
}) => {
  try {
    // upadating the product using transaction
    const result = await sequelize.transaction(async (transaction) => {
      // declaring variables for category id
      let categoryId;
      // getting category
      const getCategory = await Category.findOne({
        where: {
          name: { [Op.iLike]: category },
        },
        transaction,
      });
      if (!getCategory) {
        // creating category
        const newCategory = await Category.create(
          { name: category },
          {
            transaction,
          }
        );
        // assigning category id
        categoryId = newCategory.id;
      } else {
        // assigning category id
        categoryId = getCategory.id;
      }

      // getting product
      const product = await Product.findByPk(id, {
        transaction,
      });
      if (!product)
        return { ok: false, message: "Product not found", status: 404 };

      // checking if the discount is greater than or equal to the price
      if (discount && discount >= price) {
        return {
          ok: false,
          message: "Discount can't be greater than or equal to the price",
          status: 400,
        };
      }

      // assigning discount
      let discountValue = discount > 0 ? discount : null;

      // updating product
      await product.update(
        {
          name,
          description,
          categoryId,
          price,
          discount: discountValue,
          stock,
        },
        {
          transaction,
        }
      );

      // creating or updating products tags
      for (let tagName of tags) {
        const [tag] = await Tag.findOrCreate({
          where: { name: tagName },
          transaction,
        });

        await product.addTag(tag, { transaction });
      }

      // creating logs
      await Log.create({
        userId,
        action: "updated a product",
      });

      return { ok: true };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const gettingProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ["name"], as: "category" },
        { model: Tag, attributes: ["name"], as: "tags" },
      ],
    });

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      image: product.image,
      category: product.category?.name || null,
      tags: product.tags.map((tag) => tag.name),
    }));

    return formattedProducts;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: Category, attributes: ["name"], as: "category" },
        { model: Tag, attributes: ["name"], as: "tags" },
      ],
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      image: product.image,
      category: product.category?.name || null,
      tags: product.tags.map((tag) => tag.name),
    };
  } catch (error) {
    throw error;
  }
};

const searchingProduct = async (word) => {
  try {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${word}%` } },
          { "$category.name$": { [Op.iLike]: `%${word}%` } },
          { "$tags.name$": { [Op.iLike]: `%${word}%` } },
        ],
      },
      include: [
        { model: Category, as: "category", attributes: ["name"] },
        { model: Tag, as: "tags", attributes: ["name"] },
      ],
      distinct: true,
    });

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  creatingProduct,
  gettingProducts,
  getProductById,
  updatingProduct,
  searchingProduct,
};
