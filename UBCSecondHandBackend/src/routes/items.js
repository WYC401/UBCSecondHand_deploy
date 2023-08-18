const ItemDB = require("../database/schemas/Item");
const Router = require("express");
const router = Router();
const mongoose = require('mongoose');
const fs = require('fs');
const {open} = require('node:fs/promises');
const Item = require("../database/schemas/Item");

// {
//     "title": "E-bike",
//     "price": 200,
//     "description": "This is a new bike",
//     "picturePath" : "/user/pic/1.png"
// }


// these four are from user side.
router.post("/postNewItem", (req, res) => {
    const temp = req.body;
    temp.userID = req.user._id;
    ItemDB.create(temp).then(() => {
        res.send(200);
    }).catch((err) => {
        console.log(err.message);
        res.send(400);
    });
});

//localhost:3000/api/items/63bfb4f997bd709b83cd3774
router.put("/:itemID", (req, res) => {
    ItemDB.updateOne({_id: mongoose.Types.ObjectId(req.params.itemID)}, req.body).then(() => {
        res.send(200);
    }).catch((err) => {
        console.log(err.message);
        res.send(400);
    });
    
});
// send back array of json
router.get("/", (req, res) => {
    ItemDB.find({userID: req.user._id}, (err, items) => {
        if(err) res.send(400);
        else {
            items.forEach (item => {JSON.stringify(item)});
            console.log(items);
            res.send(items);
        }
    });
})

router.delete("/:itemID", (req, res) => {
    ItemDB.deleteOne({_id: mongoose.Types.ObjectId(req.params.itemID)}).then(() => {
        res.send(200);
    }).catch((err) => {
        console.log(err.message);
        res.send(400);
    });
});

router.get("/search", async (req, res) => {
    console.log( req.query);
    const parsedQuery = parseParams(req.query);
    let temp = ItemDB.find(parsedQuery);
    if(req.query.keywords) {
        const cleanedKeywords = await breakIntoKeyword(req.query.keywords);

        const keywordConditon = createKeyWordCondition(cleanedKeywords);
        //console.log(keywordConditon["$or"][1]);
        temp = temp.where(keywordConditon);
    } 

    temp.exec( (err, items) => {
        if(err) res.send(400);
        else {
            items.forEach (item => {JSON.stringify(item)});
            console.log(items);
            res.send(items);
        }
    });
});

// $or: [{title : {$regex: ".*"+word1+".*", $options:"i"}}, {description : {$regex: ".*"+word1+".*", $options:"i"}}]

function createKeyWordCondition(cleanedKeywords) {
    const result = {};
    result["$or"] = [];
    console.log(cleanedKeywords);
    for(let i in cleanedKeywords) {
        console.log(i);
        let tempTitle = {};
        let tempDescription = {}; 
        tempTitle["title"] = {};
        tempTitle["title"]["$regex"] = ".*" + cleanedKeywords[i] + ".*";
        tempTitle["title"]["$options"] = "i";
        console.log(tempTitle);
        tempDescription["description"] = {};
        tempDescription["description"]["$regex"] = ".*" + cleanedKeywords[i] + ".*";
        tempDescription["description"]["$options"] = "i";

        result["$or"].push(tempDescription);
        result["$or"].push(tempTitle);

    }
    return result;

}

function parseParams(rawObject) {
    let res = {};
    if(rawObject.hasOwnProperty("category")) {
        res["category"] = rawObject["category"];
    }
    if(rawObject.hasOwnProperty("price")) {
        // console.log(typeof rawObject["price"][0]);
        res["price"] = {};
        if(typeof rawObject["price"] === "string") {
            createFilterObject(rawObject["price"], res["price"]);
        } else {
            rawObject["price"].forEach(element => {
                createFilterObject(element, res["price"]);
            });
        }
    }

    return res;
}

//add $ls or $gt to query object 
function createFilterObject(str, queryObject) {
    queryObject["$" + str.substring(0,2)] = parseFloat(str.substring(2));

}

async function breakIntoKeyword(keystring) {
    let cleanedString = keystring.replace(/\s+/g, ' ').trim();
    let words = cleanedString.split(" ");
    let stopWords;

    let filehandle;

    try {
        filehandle = await open('src/configuration/stopwords.txt', 'r');
        return filehandle.readFile(encoding = 'utf-8').then((str) => {
            let stopWords = str.split("\r\n");
            return words.filter(word => !stopWords.includes(word));
        }).catch((err) => {
            throw err;
        });
    } catch(err) {
        console.log(err);
    }finally {
        await filehandle?.close();
 
    }
    


}
module.exports = router;