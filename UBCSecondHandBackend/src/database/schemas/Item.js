const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        requred: true
    },
    userID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String,
        requred: true
    },
    picturePath:  mongoose.SchemaTypes.String,
    createAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }

});
const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;