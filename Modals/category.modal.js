const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  object: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

});

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
