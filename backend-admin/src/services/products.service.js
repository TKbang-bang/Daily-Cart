const { Op, where } = require("sequelize");
const { sequelize, Category, Product, Tag } = require("../../models");

const creatingProduct = async ({
  name,
  description,
  category,
  price,
  stock,
  tags,
  filename,
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
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { creatingProduct };
