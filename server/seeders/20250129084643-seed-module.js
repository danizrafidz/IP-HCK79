'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let modules = JSON.parse(fs.readFileSync('./data/modules.json', 'utf8')).map((module) => {
      delete module.id
      module.createdAt = new Date()
      module.updatedAt = new Date()
      return module
    })
    await queryInterface.bulkInsert('Modules', modules)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
