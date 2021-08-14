import NewUserModule from "../modules/newUserModule.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const loginFunc = async (req, res) => {
  const { email, logInPassword } = req.body;
  try {
    const user = await NewUserModule.login(email, logInPassword);

    if (user) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.tokV,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ result: user, token });
    }
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};
export const signUpFunc = async (req, res) => {
  const { email, password, cPasword, firstName, lastName } = req.body;

  try {
    const cheeckUser = await NewUserModule.findOne({ email });
    if (cheeckUser) {
      return res.status(404).json({ message: "Email already taken" });
    }

    if (password !== cPasword) {
      return res.status(400).json({ message: "Password Are Different" });
    }
    const hash = await bcrypt.hash(password, 12);

    const user = await NewUserModule.create({
      email,
      password: hash,
      name: `${lastName} ${firstName}`,
    });
    const token = await jwt.sign(
      { email: user.email, id: user._id },
      "titouch",
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result: user, token });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
