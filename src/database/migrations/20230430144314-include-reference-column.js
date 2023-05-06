'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'studentsCourses',
      {
        courseId: {
          allowNull: false,
          primaryKey: true,
          onDelete: 'CASCADE',
          references: {
            model: {
              tableName: 'courses'
            },
            key: 'id'
          },
          type: Sequelize.INTEGER().UNSIGNED
        },
        studentId: {
          allowNull: false,
          primaryKey: true,
          onDelete: 'CASCADE',
          references: {
            model: {
              tableName: 'students'
            },
            key: 'id'
          },
          type: Sequelize.INTEGER().UNSIGNED
        },
        externalStudentId: {
          allowNull: false,
          type: Sequelize.STRING(200)
        },
       
      
        status: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        reference: {
          allowNull: false,
          type: Sequelize.STRING(200)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE()
        },
      },
     
      {
        uniqueKeys: {
          organization_user_unique: {
            fields: ['studentId', 'courseId']
          }
        }
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('studentsCourses');
  }
};

