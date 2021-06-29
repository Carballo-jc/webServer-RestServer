const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin, googleSignIn } = require("../controllers/auth");
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
router.post(
  "/google",
  [
    check("id_token", "El id_token de google es necesario").not().isEmpty(),
    validateInputs,
  ],
  googleSignIn
);

module.exports = router;
