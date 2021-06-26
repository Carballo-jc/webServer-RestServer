const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  updateUser,
  createUsers,
  deleteUsers,
} = require("../controllers/users");
const { validateRole, validateEmail } = require("../helpers/validate-db");
const { validateInputs } = require("../middlewares/validate-input");

const router = Router();

router.get("/", getUsers);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom((id) => validateId(id)),
    check("role").custom((role) => validateRole(role)),
    validateInputs,
  ],
  updateUser
);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("email").custom((email) => validateEmail(email)),
    // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom((role) => validateRole(role)),
    validateInputs,
  ],
  createUsers
);
router.delete("/:id", deleteUsers);

module.exports = router;
