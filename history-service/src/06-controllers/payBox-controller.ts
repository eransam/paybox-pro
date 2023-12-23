import express, { NextFunction, Request, Response } from "express";
import { HistoryPayBox } from "../03-models/historyPayBox-model";
import UserPayBoxLogic from "../05-logic/payBox-logic";
const router = express.Router();

router.post(
  "/insertHistory",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const History = new HistoryPayBox(request.body);
      const addedHistory = await UserPayBoxLogic.addHistory(History);
      response.status(201).json(addedHistory);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/get_history_payments",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categories = await UserPayBoxLogic.get_history_payments();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
