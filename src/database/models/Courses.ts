import { sequelize } from '../sequelize';
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
    // @ts-ignore
export type CoursesAttributes = InferAttributes<Courses>;
class Courses extends Model<CoursesAttributes, InferCreationAttributes<Courses>> {

  declare id: CreationOptional<number>;

  declare name: string;

  declare description: string;

  declare courseCode: string;

  declare lessons: number;

  declare fee: number;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

}

Courses.init(
    // @ts-ignore

  {
    // @ts-ignore

    id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    courseCode: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    fee: {
      type: DataTypes.INTEGER(),
      allowNull: true
    },

    lessons: {
      type: DataTypes.INTEGER(),
      allowNull: true
    },

    createdAt: DataTypes.DATE(),
    updatedAt: DataTypes.DATE()
  },
  {
    tableName: 'courses',
    sequelize
  }
);

export { Courses };
