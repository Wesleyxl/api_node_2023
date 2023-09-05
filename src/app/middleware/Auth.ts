/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import jwtConfig from "../../config/jwt";
import User from "../model/User";

declare module "express" {
  interface Request {
    userEmail?: string;
  }
}
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { token } = req.cookies;

  if (!token) {
    res.clearCookie("token");
    return res.status(401).json({ errors: ["Unauthorized"] });
  }

  try {
    const data = jwt.verify(token, jwtConfig.jwt_secret) as JwtPayload;

    const { email } = data;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ["Unauthorized"],
      });
    }

    req.userEmail = user.email;

    next();
  } catch (e: any) {
    res.clearCookie("token");
    if (e.errors && Array.isArray(e.errors)) {
      return res.status(400).json({
        errors: e.errors.map((err: { message: string }) => err.message),
      });
    }

    return res.status(401).json({
      errors: ["Unauthorized"],
    });
  }
};
