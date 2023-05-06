import { sequelize } from '../sequelize';
import { Courses } from './Courses';
import { Students } from './Students';

import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
// @ts-ignore

class StudentsCourses extends Model<InferAttributes<StudentsCourses>, InferCreationAttributes<StudentsCourses>> {

  declare courseId: number;

  declare status: CreationOptional<'paid' | 'outstanding'>;

  declare externalStudentId: string;

  declare reference: string;

  declare createdAt: CreationOptional<Date>;
}

StudentsCourses.init(
  {
    // @ts-ignore

    courseId: {
      primaryKey: true,
      type: DataTypes.INTEGER().UNSIGNED,
      references: {
        model: Courses,
        key: 'id'
      },
      allowNull: false
    },
    externalStudentId: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
  
    status: {
      type: DataTypes.ENUM('paid', 'outstanding'),
      defaultValue: 'outstanding',
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    createdAt: DataTypes.DATE(),

  },
  {
    tableName: 'studentsCourses',
    timestamps: false,
    sequelize
  }
);

Students.belongsToMany(Courses, {
  as: 'courses',
  through: StudentsCourses,
  foreignKey: 'externalStudentId',
  otherKey: 'courseId'
});
Courses.belongsToMany(Students, {
  as: 'students',
  through: StudentsCourses,
  foreignKey: 'courseId',
  otherKey: 'externalStudentId'
});

export { StudentsCourses };
