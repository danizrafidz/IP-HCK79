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
    let teams = JSON.parse(fs.readFileSync('./data/teams.json', 'utf8')).map((team) => {
      delete team.id
      team.createdAt = new Date()
      team.updatedAt = new Date()
      return team
    })
    await queryInterface.bulkInsert('Teams', teams)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
