const { Category } = require("../../db/models");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      where: { user: req.user.id },
      attributes: ["id", "name"],
    });
    res.status(200).json({
      message: "Success get all categories",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategories = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name: name, user: req.user.id });

    res.status(201).json({
      message: "Success create data category",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const checkCategory = await Category.findOne({
      where: {
        id: id,
        user: req.user.id,
      },
    });

    const category = await checkCategory.update({ name: name });

    res.status(200).json({
      message: "Success update data category",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategories = async (req, res, next) => {
  Category.findOne({
    where: { id: req.params.id, user: req.user.id },
  })
    .then((categories) => {
      if (categories) {
        categories.destroy();

        res.status(200).json({
          message: "Success delete categories",
          data: categories,
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
};
