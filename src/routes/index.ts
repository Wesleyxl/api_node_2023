import { Router } from "express";

import AuthController from "../app/controller/AuthController";

const route = Router();

route.get("/test", (req, res) => {
  res.json("Hello World");
});

route.post("/auth/login", AuthController.login);
route.post("/auth/register", AuthController.register);

export default route;
