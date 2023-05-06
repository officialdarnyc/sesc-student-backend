'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER()
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      courseCode: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      fee: {
        allowNull: false,
        type: Sequelize.INTEGER()
      },
      lessons: {
        allowNull: false,
        type: Sequelize.INTEGER()
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
    await queryInterface.dropTable('courses');
  }
};

