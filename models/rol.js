const { Schema, model } = require("mongoose");

const RolSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatori"],
  },
});

module.exports = model("Rol", RolSchema);
