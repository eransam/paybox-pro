const UserPayBoxLogic = require("./"); // Adjust the path accordingly
import { request } from "supertest";
const app = require("../app"); // Adjust the path accordingly

describe("POST /transfer_money", () => {
  it("should transfer money successfully with valid data", async () => {
    const response = await request(app).post("/transfer_money").send(`    {
        "userIdExport": 5555,
        "userIdImport": 4444,
        "moneyToTransfer": 2
           }`);
  });

  it("should handle an invalid transfer with appropriate error response", async () => {
    const response = await request(app).post("/transfer_money").send(`    {
        "userIdExport": 5555,
        "userIdImport": 44744,
        "moneyToTransfer": 2
           }`);
  });
});
