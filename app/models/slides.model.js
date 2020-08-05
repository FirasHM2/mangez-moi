const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  findOrCreate = require("mongoose-findorcreate");;

var itemSchema = new Schema({
  id: String,
  content: String,
  image: {
    type: Buffer,
    contentType: String
  }
});

itemSchema.pre('save', function (next) {
  this.id = new mongoose.Types.ObjectId().toHexString();
  next();
});

itemSchema.plugin(findOrCreate);
const Slide = mongoose.model("Slide", itemSchema);

module.exports = Slide;
