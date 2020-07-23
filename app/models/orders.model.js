var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var OrderSchema = new Schema({
    id : String,
    customer : String,
    category : String,
    product : String,
    details : Array,
    status : {
        type : String,
        default : "carted"
    },
    created : {
        type : Date,
        default : Date.now
    }
});

OrderSchema.pre('save', function(next) {
    this.id = new mongoose.Types.ObjectId().toHexString();
    next();
});

OrderSchema.plugin(findOrCreate);

var Order = mongoose.model("Cart", OrderSchema);
module.exports = Order;