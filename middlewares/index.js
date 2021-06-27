const validateInputs = require("../middlewares/validate-input");
const validateJWT = require("../middlewares/validate-jwt");
const isRoleValid = require("../middlewares/validate-role");

module.exports = {
  ...validateInputs,
  ...validateJWT,
  ...isRoleValid,
};
