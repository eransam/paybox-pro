**Digital Wallet’s web application**

- [Description](#Description)
- [Getting Started](#Getting_Started)
- [Prerequisites](#Prerequisites)
- [Usage_API](#Usage_API)
- [Project_author](#Project_author)

## Description

A project written in NODEJS.
The database linked to this project has a table of users
containing users registered in the system with details
Personal information and the amount of money they have in their account
and a table containing the history of the actions performed in the application.
This project accepts money transfer requests from one user to another,
Checks whether the request is legal by checking whether these agents exist in the system and whether the amount of money to be transferred is correct and there is a balance in the transferor's account
and then performs the transfer and updates the user accounts.
Attached to this project is a function to send a message to the user who receives a money transfer, which informs him that a transfer has been made to him, including all the details of the transfer.

\*\* After doing the money transfer function
`get_notification()` is activated and returns as an answer to the request : post `http://localhost:3001/api/transfer_money`
the message to the user to whom the money is transferred.

\*\*Bonus: in the payBox-logic i create the func openConfirmationDialog() that ask the user in the terminal And if he approves the transfer of the money the process continues.

## Getting_Started

Follow these steps to install, set up, and run the project. Make sure you have the required prerequisites installed.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
[Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager)
[MongoDB](https://www.mongodb.com/try/download/community) database server

- Step 1: Clone the Repository:
  git clone ` https://github.com/eransam/paybox-microservice.git`
  ` cd your-project`

- Step 2: Import the MongoDB Database:
  Ensure your MongoDB server is running, then run the following commands to import the database:
- (`/c/Program\ Files/MongoDB/Server/5.0/bin/mongorestore --uri="mongodb://127.0.0.1:27017/your-database" --gzip --archive=./backup.gz` )

- Step 3: Install Dependencies:
  `cd history-service`
  `npm install`
  `cd ../users-service`
  `npm install`

- Step 4: Run the Services
  `cd history-service`
  `npm start`
  `cd ../users-service`
  `npm start`

## Usage_API:

This section provides examples and instructions on how to use the services in this project.

> in user-servcie:

- 1.transfer money between 2 users:
  send this obj:
  `{"userIdExport": 5555,"userIdImport": 4444,"moneyToTransfer": 2}`
  in post `http://localhost:3001/api/transfer_money`
- 2.add new user:
  send this obj:
  `{"firstName":"itzik","lastName":"shviro","userId":4444,"money":2359}`
  in post `http://localhost:3001/api/insertUser`
- 3.get all the users:
  get `http://localhost:3001/api/get_users`

> in history-servcie:

- 1.There is no need to independently enter a history because the other service communicating with this service performs this operation automatically
  post `http://localhost:3002/api/insertHistory`
- 2.get all the history payments:
  get `http://localhost:3002/api/get_history_payments`

## Project Author

| Full Name     | Email               | Phone      | GitHub                               | LinkedIn                                                         |
| ------------- | ------------------- | ---------- | ------------------------------------ | ---------------------------------------------------------------- |
| Eran Samimian | eransam21@gmail.com | 0524258058 | [GitHub](https://github.com/eransam) | [LinkedIn](https://www.linkedin.com/in/eran-samimian-6b897a233/) |
