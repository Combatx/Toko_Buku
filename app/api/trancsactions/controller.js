const { Transaction, DetailTransaction, Book } = require("../../db/models");
const { Op } = require("sequelize");

const getTransactionList = async (req, res, next) => {
  try {
    const { keyword = "" } = req.query;

    let condition = {
      user: req.user.id,
    };

    if (keyword !== "") {
      condition = { ...condition, invoice: { [Op.like]: `%${keyword}%` } };
    }

    const transaction = await Transaction.findAll({
      where: condition,
      include: {
        model: DetailTransaction,
        as: "detailTransaction",
      },
    });
    res.status(200).json({
      message: "Success get all transaction",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

const detailTransactionList = async (req, res, next) => {
  try {
    const { id } = req.params;

    let condition = {
      id,
      user: req.user.id,
    };

    const detailTransaction = await Transaction.findOne({
      where: condition,
      include: {
        model: DetailTransaction,
        as: "detailTransaction",
      },
    });
    res.status(200).json({
      message: "Success get detail transaction",
      data: detailTransaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactionList,
  detailTransactionList,
};
