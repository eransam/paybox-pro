import express, { NextFunction, Request, Response } from "express";
import { UserPayBox } from "../03-models/userPayBox-model";
import { TransferModel } from "../03-models/transfer-model";
import UserPayBoxLogic from "../05-logic/payBox-logic";
const router = express.Router();

router.post(
  "/insertUser",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const Payment = new UserPayBox(request.body);
      const addedProduct = await UserPayBoxLogic.addUserPayBox(Payment);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/transfer_money",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const addHistoryPayBox = new TransferModel(request.body);
      const addedProduct = await UserPayBoxLogic.addHistoryPayBox(
        addHistoryPayBox
      );
      const Notification = await UserPayBoxLogic.sendNotification(addedProduct);
      response.status(201).json(Notification[0]);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/get_users",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categories = await UserPayBoxLogic.get_users();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
