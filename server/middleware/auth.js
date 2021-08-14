import jwt from "jsonwebtoken";
const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const iscustom = token.length < 500;
    let tokkenDecode;
    if (token && iscustom) {
      tokkenDecode = jwt.verify(token, "titouch");
      req.userId = tokkenDecode?.id;
    } else {
      tokkenDecode = jwt.decode(token);
      req.userId = tokkenDecode?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default middleware;
