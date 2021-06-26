const Role = require("../models/rol");
const User = require("../models/user");

const validateRole = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El role ${role} no esta registrado en la base de datos`);
  }
};

const validateEmail = async (email = "") => {
  //verificar si elcorreo existe el
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo: ${email}, ya esta registrado`);
  }
};
const validateId = async (id) => {
  //verificar si elcorreo existe el
  const existeUserId = await User.findById(id);
  if (!existeUserId) {
    throw new Error(`El ID no esta registrado: ${id}`);
  }
};
module.exports = { validateRole, validateEmail, validateId };
