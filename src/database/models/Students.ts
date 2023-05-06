import { sequelize } from '../sequelize';
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
// @ts-ignore

export type StudentsAttributes = InferAttributes<Students>;
class Students extends Model<StudentsAttributes, InferCreationAttributes<Students>> {
  declare id: CreationOptional<number>;

  declare firstName: string;

  declare lastName: CreationOptional<string> | null;

  declare email: string;

  declare password: string;

  declare externalStudentId: string

  declare status: CreationOptional<'active' | 'graduated'>;

  declare lastLoginAt: CreationOptional<Date> | null;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Students.init(
  {
    // @ts-ignore
    id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    firstName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    externalStudentId: {
      type: DataTypes.STRING(250),
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM('active', 'graduated'),
      defaultValue: 'active',
      allowNull: false
    },

    lastLoginAt: {
      type: DataTypes.DATE(),
      allowNull: true
    },
    createdAt: DataTypes.DATE(),
    updatedAt: DataTypes.DATE()
  },
  {
    tableName: 'students',
    sequelize
  }
);

export { Students };
