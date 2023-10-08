import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { User } from "../modals/user.js";
import ErrorHandler from "../utils/errorHandle.js";
import { generatePassword, verifyPassword } from "../utils/generatePassword.js";
import { generateToken } from "../utils/generateToken.js";

class HandleUser {
  static RegisterUser = catchAsyncError(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new ErrorHandler("All fields are required.", 400));
    }
    const user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("Email Already Registered.", 400));
    }

    const hashPassword = await generatePassword(password);
    const doc = await User.create({
      username,
      email,
      password: hashPassword,
    });
    await doc.save();
    res.json({ success: true, message: "successfully registered.", doc });
  });

  static LoginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return next(new ErrorHandler("All fields are required.", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }

    const isPasswordMatch = await verifyPassword(password, user.password);
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType,
    };
    const token = await generateToken(payload);
    if (token) {
      res.cookie("token", token).json({
        success: true,
        message: "successfully logined",
        data: payload,
        token: token,
      });
    }
  });

  static AllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});
    if (!users) {
      return next(new ErrorHandler("No user found.", 200));
    }
    res.json({ success: true, users });
  });

  static UserProfile = catchAsyncError(async (req, res, next) => {
    res.json({ success: true, data: req.user });
  });

  static UserLogout = catchAsyncError(async (req, res, next) => {
    res
      .cookie("token", "")
      .json({ success: true, message: "logout succesfully" });
  });
}

export default HandleUser;
