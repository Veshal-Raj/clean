import express, { Request, Response, NextFunction } from "express";
import adminAdapter from "./injection/adminInjection";

const router = express.Router();

router.post("/create", (req: Request, res: Response, next: NextFunction) =>
  adminAdapter.createAdmin(req, res, next)
);

export default router;
