const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //verificar el email
    if (!user) {
      return res.status(400).json({
        msg: "Username and Password not Found - Email",
      });
    }
    //si el usuario es activo
    if (!user.status) {
      return res.status(400).json({
        msg: "Username inactive  - status:false",
      });
    }
    //verificar la contraseña de
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Username and Password not Found - Password",
      });
    }
    //generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: "POST login",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

module.exports = { authLogin };
