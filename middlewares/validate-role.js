//este middleware fuerza a que el usuario sea administrador

const isAdmintRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token",
    });
  }
  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} not is administrator `,
    });
  }

  next();
};
const isRole = (...role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token ",
      });
    }
    if (!role.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${role}`,
      });
    }
  };
};

module.exports = {
  isAdmintRole,
  isRole,
};
