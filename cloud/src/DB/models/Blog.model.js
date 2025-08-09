import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./User.model.js";

export class Blog extends Model{
  
    async checkUser(id){
        const user=await UserModel.findByPk(id)
        if(!user){
            throw new Error("in-valid blog owner")
        }
        return true
    }

}
Blog.init({
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true,
    field:'B_id'
},

title:{
    type:DataTypes.STRING,
    allowNull:false,
    field:'B_title',
    validate:{
        len:[2,1000]
    // },
    // get(){
    //     return `Blog Title ::: ${this.getDataValue('title')}`
    // },
    // set(value){
    //     this.setDataValue("title",value.toLowerCase())
    // }
}
},
content:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        len:[2,1000]
    },
    field:'B_content',
}
},{
sequelize,
tableName:"users_blogs",
timestamps:true,
createdAt:"B_createdAt",
updatedAt:"B_updatedAt",
paranoid:true,
deletedAt:"destroyTime"


})
Blog.belongsTo(UserModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
      name: "b_author_id",
      field: "b_author_id",
      allowNull: true,
    },
  });
  UserModel.hasMany(Blog,{
    foreignKey:{
        name:"b_author_id",
        allowNull:false
    }
  })