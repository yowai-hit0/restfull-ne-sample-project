import { Router } from "express";
import {
  register,
  login,
  requestOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import {
  RegisterDTO,
  LoginDTO,
  EmailDTO,
  ResetPasswordDTO,
} from "../dtos/auth.dto";
import { verifyAuth } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", validateRequest(RegisterDTO), register);
authRouter.post("/login", validateRequest(LoginDTO), login);
authRouter.post("/request-otp", validateRequest(EmailDTO), requestOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/forgot-password", validateRequest(EmailDTO), forgotPassword);
authRouter.post( "/reset-password",  validateRequest(ResetPasswordDTO), resetPassword);
authRouter.post("/logout", verifyAuth, logout
  /*
  #swagger.tags = ['Auth']
  #swagger.description = 'Logout user'
  #swagger.security = [{ "bearerAuth": [] }]
  */
);

export default authRouter;
