const { User } = require("../../models");

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserByEmail, getUserById };
