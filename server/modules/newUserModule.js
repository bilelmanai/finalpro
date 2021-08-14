import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  id: { type: String },
});

userSchema.statics.login = async function (email, password) {
  const loginUser = await this.findOne({ email });
  if (loginUser) {
    const bcryptPass = await bcrypt.compare(password, loginUser.password);
    if (bcryptPass) {
      return loginUser;
    }
    throw Error("Wrong Password");
  }
  throw Error("Email doesnt exist");
};
const newUserModule = mongoose.model("NewUserModule", userSchema);

export default newUserModule;
