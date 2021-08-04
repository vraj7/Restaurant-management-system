const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    itemName: { type: String },
    itemDescription: { type: String },
    image: { type: String }
});
const MenuSchema = Schema({
    menuName: { type: String },
    menuDescription: { type: String },
    Items: [ItemSchema]
});
const restaurantSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    Menus: [MenuSchema]
});


const Menus = mongoose.model('Menus', MenuSchema);
const Items = mongoose.model('Items', ItemSchema);
module.exports = mongoose.model('restaurant', restaurantSchema);
