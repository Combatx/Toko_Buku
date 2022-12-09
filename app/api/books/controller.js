const { Book, Category } = require("../../db/models");
const { Op } = require("sequelize");
const { response } = require("express");

const getAllBooks = async (req, res, next) => {
  try {
    const { keyword = "", category = "" } = req.query;

    let condition = {
      user: req.user.id,
    };

    if (keyword !== "") {
      condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
    }

    if (category !== "") {
      condition = { ...condition, category: category };
    }

    const books = await Book.findAll({
      where: condition,
      include: {
        model: Category,
        attributes: ["id", "name"],
      },
    });
    res.status(200).json({
      message: "Success get all books",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const createBooks = async (req, res, next) => {
  try {
    let user = req.user.id;
    const { title, price, category, author, published, stock, image } =
      req.body;

    const checkCategory = await Category.findOne({
      where: {
        id: category,
        user: user,
      },
    });

    if (!checkCategory) {
      return res.status(404).json({
        message: "id category not found",
      });
    }

    const books = await Book.create({
      title,
      price,
      category,
      author,
      published,
      stock,
      image,
      user,
    });

    res.status(201).json({
      message: "Success create books",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const updateBooks = async (req, res, next) => {
  try {
    let user = req.user.id;
    const { id } = req.params;
    const { title, price, category, author, published, stock, image } =
      req.body;

    const checkCategory = await Category.findOne({
      where: {
        id: category,
        user: user,
      },
    });

    if (!checkCategory) {
      return res.status(404).json({
        message: "id category not found",
      });
    }

    const checkBook = await Book.findOne({
      where: { id: id },
    });

    if (!checkBook) {
      return res.status(404).json({ message: "Book not Found" });
    }

    const books = await checkBook.update({
      title,
      price,
      category,
      author,
      published,
      stock,
      image,
      user,
    });

    res.status(201).json({
      message: "Success update books",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooks = async (req, res, next) => {
  try {
    const books = await Book.findOne({ where: { id: req.params.id } });
    if (!books) {
      return res.status(404).json({ message: "Book not Found" });
    }

    books.destroy();

    res.status(200).json({
      message: "Success delete books",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  createBooks,
  updateBooks,
  deleteBooks,
};
