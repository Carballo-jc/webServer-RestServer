const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "12h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("no se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = {
  generateJWT,
};
