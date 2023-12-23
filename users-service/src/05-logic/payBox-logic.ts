import { IUserPayBox, UserPayBox } from "../03-models/userPayBox-model";
import { createInterface } from "readline";
import ErrorModel from "../03-models/error-model";
import axios from "axios";
import config from "../01-utils/config";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// addUserPayBox
async function addUserPayBox(UserPayBox: IUserPayBox): Promise<IUserPayBox> {
  const errors = UserPayBox.validateSync();
  if (errors) throw new ErrorModel(400, errors.message);
  return UserPayBox.save();
}

// addHistoryPayBox
async function addHistoryPayBox(HistoryPayBox) {
  const errors = HistoryPayBox.validateSync();
  if (errors) {
    throw new ErrorModel(400, errors.message);
  }
  const userExport = await UserPayBox.findOne({
    userId: HistoryPayBox.userIdExport,
  });

  if (!userExport) {
    throw new ErrorModel(
      400,
      "The customer who transfers money does not exist in the system"
    );
  }
  const userImport = await UserPayBox.findOne({
    userId: HistoryPayBox.userIdImport,
  });

  if (!userImport) {
    throw new ErrorModel(
      400,
      "The customer you want to transfer the money to does not exist in the system"
    );
  }

  if (userExport.money < HistoryPayBox.moneyToTransfer) {
    throw new ErrorModel(400, "The customer's balance is insufficient");
  }

  const userPayBox_Import = await UserPayBox.findOne({
    userId: HistoryPayBox.userIdImport,
  }).exec();

  const userPayBox_Export = await UserPayBox.findOne({
    userId: HistoryPayBox.userIdExport,
  }).exec();

//   userConfirmation
  const userConfirmation = await openConfirmationDialog(
    `Hi ${userPayBox_Import.firstName} Do you want to accept the money transfer?`
  );

  if (!userConfirmation) {
    throw new ErrorModel(400, "The recipient denied the money transfer");
  }

  await UserPayBox.updateOne(
    { userId: HistoryPayBox.userIdExport },
    { $set: { money: userExport.money - HistoryPayBox.moneyToTransfer } }
  );

  await UserPayBox.updateOne(
    { userId: HistoryPayBox.userIdImport },
    { $set: { money: userImport.money + HistoryPayBox.moneyToTransfer } }
  );

  var obj_to_add = {
    moneyToTransfer: HistoryPayBox.moneyToTransfer,
    firstName_user_export: userPayBox_Export.firstName,
    lastName_user_export: userPayBox_Export.lastName,
    userIdExport: HistoryPayBox.userIdExport,
    userIdImport: HistoryPayBox.userIdImport,
    firstName_user_Import: userPayBox_Import.firstName,
    lastName_user_Import: userPayBox_Import.lastName,
  };
  const response = await axios.post<any[]>(config.insertHistory, obj_to_add);
  return response.data;
}

// get_users
async function get_users(): Promise<IUserPayBox[]> {
  return UserPayBox.find().exec();
}

async function sendNotification(main_obj: any): Promise<any[]> {
  const msg = `hi ${main_obj.firstName_user_Import} ${main_obj.lastName_user_Import} You received a transfer of ${main_obj.moneyToTransfer} from ${main_obj.firstName_user_export} ${main_obj.lastName_user_export}`;
  return [msg];
}

async function openConfirmationDialog(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    rl.question(`${message} (yes/no): `, (answer) => {
      resolve(answer.toLowerCase().trim() === "yes");
    });
  });
}

export default {
  addUserPayBox,
  addHistoryPayBox,
  get_users,
  sendNotification,
};
