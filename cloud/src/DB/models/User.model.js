import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const UserModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: 'U_id'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'U_firstName',
      validate: {
        notEmpty: { msg: "firstName cannot be empty" },
        len: {
          args: [4, 50],
          msg: "firstName must be between 4 and 50 characters"
        }
      },
      get() {
        const gender = this.getDataValue('gender');
        const name = this.getDataValue('firstName');
        return gender === 'male' ? 'mr:' + name : 'mis:' + name;
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'U_lastName',
      validate: {
        checkName(value) {
          if (value === 'admin') {
            throw new Error('lastName cannot be admin');
          }
        },
        notEmpty: { msg: "lastName cannot be empty" },
        len: {
          args: [4, 50],
          msg: "lastName must be between 4 and 50 characters"
        }
      }
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      set(value) {
        const [firstNam, lastName] = value.split(" ") || [];
        this.setDataValue('firstName', firstNam);
        this.setDataValue('lastName', lastName);
      },
      get() {
        const first = this.getDataValue("firstName");
        const last = this.getDataValue("lastName");
        return `${first} ${last}`;
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'U_email',
      unique: true,
      validate: {
        notEmpty: { msg: "email cannot be empty" },
        isEmail: { msg: "email must be valid" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'U_password',
      validate: {
        notEmpty: { msg: "password cannot be empty" },
        len: {
          args: [4, 50],
          msg: "password must be between 4 and 50 characters"
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
          msg: "password must contain at least one uppercase and one lowercase letter"
        }
      }
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      defaultValue: 'male',
      field: 'U_gender'
    },
    DOB: {
      type: DataTypes.DATE,
      field: 'U_DOB'
    },
    confirmEmail: { // تم تصحيح الاسم هنا
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'U_confirmEmail'
    }
  },
  {
    tableName: 'User',
    timestamps: true,
    createdAt: 'U_createdAt',
    updatedAt: 'U_updatedAt',
    paranoid:true,
    deletedAt:'destroyTime'
  }
);
