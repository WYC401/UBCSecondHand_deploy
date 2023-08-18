const mongoose = require("mongoose");

const dbURL = "mongodb://localhost:27017/UBCSecondHand";
mongoose.connect(dbURL).then(
    () => {
        console.log("the database is connected");
    }
).catch(
    (err) => {
        console.log(err);
    }
);