'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Users', {
      fields: ['TeamId'],
      type: 'foreign key',
      name: 'fkey_user_team',
      references: { //Required field
        table: 'Teams',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE '
    });

    await queryInterface.addConstraint('Modules', {
      fields: ['AuthorId'],
      type: 'foreign key',
      name: 'fkey_module_author',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE ',
      onUpdate: 'CASCADE '
    });
    await queryInterface.addConstraint('Modules', {
      fields: ['TeamId'],
      type: 'foreign key',
      name: 'fkey_module_team',
      references: { //Required field
        table: 'Teams',
        field: 'id'
      },
      onDelete: 'CASCADE ',
      onUpdate: 'CASCADE '
    });

    await queryInterface.addConstraint('MyModules', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkey_mymodule_user',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE ',
      onUpdate: 'CASCADE '
    });
    await queryInterface.addConstraint('MyModules', {
      fields: ['ModuleId'],
      type: 'foreign key',
      name: 'fkey_mymodule_module',
      references: { //Required field
        table: 'Modules',
        field: 'id'
      },
      onDelete: 'CASCADE ',
      onUpdate: 'CASCADE '
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Users", "fkey_user_team")
    await queryInterface.removeConstraint("Modules", "fkey_module_author")
    await queryInterface.removeConstraint("Modules", "fkey_module_team")
    await queryInterface.removeConstraint("MyModules", "fkey_mymodule_user")
    await queryInterface.removeConstraint("MyModules", "fkey_mymodule_module")
  }
};
