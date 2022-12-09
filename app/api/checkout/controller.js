const { Transaction, DetailTransaction, Book } = require("../../db/models");
const { Op } = require("sequelize");
const sequelize = require("../../db/models").sequelize;

const checkout = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { payload } = req.body;
    const user = req.user.id;

    const transaction = await Transaction.create(
      {
        invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(),
        user,
      },
      { transaction: t }
    );

    let errorBookIdNotFound = [],
      errorBookIdStock = [],
      updateStock = [];

    for (let i = 0; i < payload.length; i++) {
      const checkBook = await Book.findOne({
        where: { id: payload[i].bookId, user },
      });

      //detail transaction
      payload[i].transaction = transaction.id;
      payload[i].book = checkBook?.id;
      payload[i].titleBook = checkBook?.title;
      payload[i].imageBook = checkBook?.image;
      payload[i].author = checkBook?.author;
      payload[i].priceBook = checkBook?.price;
      payload[i].user = user;

      updateStock.push({
        id: payload[i].bookId,
        stock: checkBook?.stock - payload[i].quantity,
        user,
      });

      console.log(updateStock);

      if (payload[i]?.quantity > checkBook?.stock) {
        errorBookIdStock.push(
          `bookId ${payload[i].bookId} from stock ${payload[i]?.quantity} - ${checkBook?.stock}`
        );
      }

      if (!checkBook) {
        errorBookIdNotFound.push(payload[i]?.bookId);
      }
    }

    if (errorBookIdStock.length !== 0) {
      return res.status(400).json({
        message: `book stock is not enough with ${errorBookIdStock.join(
          ", "
        )} and user: ${user}`,
      });
    }

    if (errorBookIdNotFound.length !== 0) {
      return res.status(400).json({
        message: `no book id : ${errorBookIdNotFound.join(
          ", "
        )}  and user: ${user}`,
      });
    }

    await Book.bulkCreate(
      updateStock,
      {
        updateOnDuplicate: ["stock"],
      },
      {
        transaction: t,
      }
    );

    const detailTransaction = await DetailTransaction.bulkCreate(payload, {
      transaction: t,
    });

    await t.commit();

    res.status(201).json({
      message: "success checkout",
      data: detailTransaction,
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
};

module.exports = {
  checkout,
};
