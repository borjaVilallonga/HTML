'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   // añadimos la info de los 3 nuevos post
    await queryInterface.bulkInsert('Posts', [
      {
          title: 'Primer Post',
          body: 'Esta práctica implementa un Blog.',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          title: 'Segundo Post',
          body: 'Todo el mundo puede crear posts.',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          title: 'Tercer Post',
          body: 'Cada post puede tener una imagen adjunta.',
          createdAt: new Date(),
          updatedAt: new Date()
      }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // borrado en grupo o multiple
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
