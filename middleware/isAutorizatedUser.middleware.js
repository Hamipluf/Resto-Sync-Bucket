import customResponses from "../utils/customResponses.js";

export const isAutorizedUser = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res
      .status(401)
      .json(
        customResponses.badResponse(
          401,
          "Solo users autorizados pueden acceder."
        )
      );
  }
  if (user && user.role === 1) {
    return res
      .status(401)
      .json(
        customResponses.badResponse(
          401,
          "Necesitas se user Premium o Admin para utilizar esta funcionalidad."
        )
      );
  }
  // SI existe el usuario y el role no es user basico pasa
  user && user.role !== 1 && next();
};
