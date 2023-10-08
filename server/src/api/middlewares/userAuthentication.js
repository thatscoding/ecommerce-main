import ErrorHandler from "../utils/errorHandle.js";
import { verifyToken } from "../utils/generateToken.js";
import { catchAsyncError } from "./catchAsyncErrors.js";

export const userAuthentication = catchAsyncError(async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return next(new ErrorHandler("Token not found!", 401));
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return next(new ErrorHandler("Invalid Token!", 401));
  }
  req.user = payload;
  next();
});
