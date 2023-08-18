const Router = require("express");
// get user profile, get request
// add item to items, post request 
const router = Router();
const UserDB = require("../database/schemas/User");

router.get("/profile", (req, res)=> {
    console.log(req.user);
    console.log(req.session);
    res.send(req.user);
});

// test with 
// {
//     "desiredProfile": {
//         "phone_number": "123456",
//         "credit_score": 98

//     }
// }

router.put("/profile", async (req, res)=> {
    const desiredProfile = req.body.desiredProfile;
    if(desiredProfile) {
        try {
            const rest = await UserDB.updateOne({email: req.user.email}, desiredProfile); // res
            res.send(200);
        } catch {
            res.send(400);
        }
        
    } else {
        res.send(400);
    }
});

module.exports = router; 