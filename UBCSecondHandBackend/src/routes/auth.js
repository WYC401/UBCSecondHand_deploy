const Router = require("express");
const router = Router();
const passport = require("passport");
const UserDB = require("../database/schemas/User");
require("../strategies/local");
router.post("/login", passport.authenticate('local'
), (req, res)=> {
    console.log(req);
    console.log("Login In");
    res.send(200);
});
router.post("/register", async (req, res) => {
    console.log("welcome to register in page");
    const {username, password} = req.body;
    const findEmail = await UserDB.findOne({email: username});
    if(findEmail) {
        res.send(302); //TODO: it should change once homepage is determined
        
    } else {
        
        await UserDB.create({email: username, password: password});
        console.log("successfully register");
        //res.send(201);
        res.redirect(307, "/api/auth/login");
        

    }
    
});

// once successfully login in, we will have user information on req.user

module.exports = router;