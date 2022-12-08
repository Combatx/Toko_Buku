"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "The Bullet That Missed : (The Thursday Murder Club 3)",
          author: "Richard Osman",
          image: "/uploads/book1.png",
          published: "Penguin Books Ltd",
          price: 350000,
          stock: 100,
          user: 1,
          category: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Glory : SHORTLISTED FOR THE BOOKER PRIZE 2022",
          author: "NoViolet Bulawayo",
          image: "/uploads/book2.png",
          published: "Vintage Publishing",
          price: 400000,
          stock: 70,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Diary of a Wimpy Kid: Diper OEverloede (Book 17)",
          author: "Jeff Kinney",
          image: "/uploads/book5.png",
          published: "Penguin Random House Children's UK",
          price: 237000,
          stock: 65,
          user: 1,
          category: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title:
            "The Seven Moons of Maali Almeida : Winner of the Booker Prize 2022",
          author: "Shehan Karunatilaka",
          image: "/uploads/book3.png",
          published: "Sort of Books",
          price: 320000,
          stock: 50,
          user: 1,
          category: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "WINGS OF FIRE 2. THE LOST HEIR",
          author: "Sutherland, Tui T.",
          image: "/uploads/book5.png",
          published: "SCHOLASTIC INFANTIL",
          price: 5600000,
          stock: 60,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
