const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderNumber : {type: String, unique: true, required: true},
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String,required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    weight: {  
        value: { type: Number, required: true },
        units: { type: String, enum: ['ounces', 'pounds'], required: true }
    },
    dimensions: {
    length: Number,
    width: Number,
    height: Number,
    },
     status: { type: String, default: 'pending' }
})

module.exports = mongoose.model('Order', OrderSchema);