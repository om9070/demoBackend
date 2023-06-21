
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const sequelize = require("../util/database");
const { Op } = require("sequelize");
const user = require("../model/user");




exports.get = async (req, res) => {
        res.send("hello word!")
}

exports.database = async (req, res) => {
        try {

                sequelize
                        .sync({
                                alter: true,
                        })
                        .then((result) => {
                                console.log(result);
                        })
                        .catch((err) => {
                                console.log(err);
                        });
        } catch (e) {
                console.log("database error", e)
        }
}

exports.login = async (req, res) => {
        try {
                const { email, password } = req.body;
                if (!email && !password) {
                        return res.status(404).send({ message: "Empty data found !", status: 0 })
                }
                const findEmail = await User.findOne({ where: { email } });
                console.log(findEmail)
                if(!findEmail){
                       return res.status(404).send({ message: "user not found", status: 0 })
                }
                const passwordCheck = await bcrypt.compare(password, findEmail.password)
                if (passwordCheck) {
                        const token = await jwt.sign({ id: findEmail.id }, process.env.adminjwt, { expiresIn: '48h' })
                        res.status(200).send({ message: "log in successfully !", status: 1, token: token })
                } else {
                        res.status(404).send({ message: "password is not matching", status: 0 })
                }
        } catch (e) {
                res.status(400).send({ message: "something went wrong", status: 0 })
                console.log("login Error", e)
        }
}

exports.register = async (req, res) => {
        try {
                const { name, email, gender, phone, password, status, date } = req.body;
                if (!name && !email && !gender && !phone && !password  && !date) {
                        return res.status(404).send({ message: "Empty data found !", status: 0 })
                }
                let passWordHash = await bcrypt.hash(password, 10)
                const dictionaryData = await user.create({ name, email, gender, phone, password: passWordHash, date })
                if (dictionaryData) {
                        return res.status(201).send({ message: "add data is successfully", status: 1 })
                }
        } catch (e) {
                res.status(400).json({ message: "something went wrong", status: 0 })
                console.log("register part", e)
        }
}


exports.getProfileData = async (req, res) => {
        try {

                const getUpdateId = await user.findOne({ where: { id: req.currentData.id } });
                if (getUpdateId) {
                        res.status(200).send({ message: " get profile  is  successfully", status: 1, data: getUpdateId })
                } else {
                        res.status(400).send({ message: "user not found!", status: 0 })
                }
        } catch (e) {
                res.status(400).send({ message: "something went wrong", status: 0 })
                console.log("getProfileData error", e)
        }
}

exports.getProfileStateUpdate = async (req, res) => {
        try {
                const { status } = req.query;
                const deletedata = await user.findOne({ where: { id: req.currentData.id } });
                deletedata.status = status;
                deletedata.save()
                if (deletedata) {
                        res.status(200).send({ message: "status update is  successfully", status: 1 })
                } else {
                        res.status(400).send({ message: "something went wrong", status: 0 })
                }
        } catch (e) {
                res.status(400).send({ message: "something went wrong", status: 0 })
                console.log("getProfileStateUpdate error", e)
        }
}

exports.changePassword = async (req, res) => {
        try {
                
                const { password, newpassord } = req.body;
                const deletedata = await user.findOne({
                        where: {  id: req.currentData.id}
                });
                const passwordCheck = await bcrypt.compare(password, deletedata.password)
                let passWordHash = await bcrypt.hash(newpassord, 10)

                if(passwordCheck){
                        deletedata.password=passWordHash
                        deletedata.save()
                res.status(200).send({ message: "password is  changed", status: 1 })
                }else{
                res.status(400).send({ message: "password is not changed", status: 0 })
                }
        } catch (e) {
                console.log("device part", e)
                res.status(400).send({ message: "something went wrong", status: 0 })
        }
}


exports.deleteProfile = async (req, res) => {
        try {
               
                const deletedata = await user.destroy({
                        where: {  id: req.currentData.id}
                });
                if(deletedata){
                res.status(400).send({ message: "user is deleted", status: 1 })

                }else{
                res.status(400).send({ message: "somethings went wrongs", status: 0 })

                }
               
        } catch (e) {
                console.log(e, "dictionary search")
                res.status(400).send({ message: "something went wrong", status: 0 })
        }
}

exports.updateProfile = async (req, res) => {
        try {
                const { name, email, gender, phone, password, status, date } = req.body;
                const updatedData = await user.findOne({
                        where: {  id: req.currentData.id}
                });
                if(updatedData){
                        updatedData.name=name;
                        updatedData.email=email;
                        updatedData.gender=gender;
                        updatedData.phone=phone;
                        updatedData.status=status;
                        updatedData.date=date;
                        updatedData.save();
                        return res.status(200).send({ message: "profile update successfully", status: 1 })
                }else{
                        return res.status(400).send({ message: "profile not update successfully", status: 0 })

                }
        } catch (e) {
                console.log(e, "dictionary search")
                res.status(400).send({ message: "something went wrong", status: 0 })
        }
}




