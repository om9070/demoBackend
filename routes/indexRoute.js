var express = require("express")
var router = express.Router()
const controller=require("../controllers/dashboard")
const AdminAuth = require("../middleware/authentication")



router.get("/database",controller.database)

router.get("/",controller.get)

//ADMIN
router.post("/login",controller.login)
router.post("/register",controller.register);
router.get("/getprofiledata",AdminAuth,controller.getProfileData);
router.get("/getstatusupdate",AdminAuth,controller.getProfileStateUpdate)
router.post("/changepassword",AdminAuth,controller.changePassword)
router.delete("/deleteprofile",AdminAuth,controller.deleteProfile)
router.put("/updateprofile",AdminAuth,controller.updateProfile)





module.exports = router