const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin } = require("../controllers/auth");
const { validateInputs } = require("../middlewares/validate-input");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateInputs,
  ],
  authLogin
);

module.exports = router;
