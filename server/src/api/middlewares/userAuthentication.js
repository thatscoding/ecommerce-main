import ErrorHandler from "../utils/errorHandle.js";
import { verifyToken } from "../utils/generateToken.js";
import { catchAsyncError } from "./catchAsyncErrors.js";

export const userAuthentication = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("Token not found!", 200));
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return next(new ErrorHandler("Invalid Token!", 200));
  }
  req.user = payload;
  next();
});
