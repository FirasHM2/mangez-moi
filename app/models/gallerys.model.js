const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  findOrCreate = require("mongoose-findorcreate");;

var itemSchema = new Schema({
  id: String,
  name: {
    type: String,
    index: true
  },
  description: String,
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
const Gallery = mongoose.model("Gallery", itemSchema);

module.exports = Gallery;
