'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER()
      },

      firstName: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING(200)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
      },

      password: {
        allowNull: true,
        type: Sequelize.STRING(250)
      },
      externalStudentId: {
        allowNull: true,
        type: Sequelize.STRING(250)
      },

      status: {
        allowNull: false,
        type: Sequelize.STRING(250)
      },
   
      lastLoginAt: {
        allowNull: true,
        type: Sequelize.DATE()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE()
      }
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('students');
  }
};

