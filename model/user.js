
const { DataTypes, Sequelize } = require("sequelize")
const sequelize=require("../util/database")
//id, name, email, gender, phone, password, status, date
const user=sequelize.define("userTable",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: { len: [2,30] },

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,//email is unique
        validate: { isEmail: true },
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: { len: [1,10] },

    },
    status:{
        type:DataTypes.STRING,
        // allowNull:false,
        defaultValue:"pending"
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: { len: 10 },

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: { len: [5,100] },

    },
    date:{
            type:DataTypes.STRING,
            allowNull:false,
    }
    
})
module.exports=user;