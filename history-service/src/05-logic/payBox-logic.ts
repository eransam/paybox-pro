import {
  IHistoryPayBox,
  HistoryPayBox,
} from "../03-models/historyPayBox-model";
import ErrorModel from "../03-models/error-model";

// addHistory
async function addHistory(History: IHistoryPayBox): Promise<IHistoryPayBox> {
  const errors = History.validateSync();
  if (errors) throw new ErrorModel(400, errors.message);
  return History.save();
}

// get_all_history_payments
async function get_all_history_payments(): Promise<IHistoryPayBox[]> {
  return HistoryPayBox.find().exec();
}

export default {
  get_all_history_payments,
  addHistory,
};
