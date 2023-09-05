import { type Request, type Response } from "express";

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    return res.json("login");
  }

  async register(req: Request, res: Response): Promise<Response> {
    return res.json("register");
  }
}

export default new AuthController();
