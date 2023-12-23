**Digital Wallet’s web application**

- [Description](#Description)
- [Getting Started](#Getting_Started)
- [Prerequisites](#Prerequisites)
- [Usage API](#Usage_API)

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

\*\*Bonus: in the payBox-logic i create the func `openConfirmationDialog()` that ask the user in the terminal And if he approves the transfer of the money the process continues.

## Getting_Started

Follow these steps to install, set up, and run the project. Make sure you have the required prerequisites installed.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
[Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager)

- Step 1: Clone the Repository:
  git clone ` https://github.com/eransam/paybox-microservice.git`
  ` cd your-project`

- Step 2: (window) Import the MongoDB Database:
  a. install [MongoDB](https://www.mongodb.com/try/download/community) database server
  b.install https://downloads.mongodb.com/compass/mongodb-compass-1.41.0-win32-x64.exe
  c.Ensure your MongoDB server is running.
  d.create db name: paybox in mongo compass.
  e.run this command in the terminal:
- (`/c/Program\ Files/MongoDB/Server/5.0/bin/mongorestore --uri="mongodb://localhost:27017" --db paybox /c/eran/work-project/paybox-new/db/payBox` )
  \*replace (/c/Program\ Files/MongoDB/Server/5.0/bin/mongorestore) to your MongoDB path
  and replace (/c/eran/work-project/paybox-new/db/payBox) to the db file (db/paybox) in this project

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

> in user-service:

- transfer money between 2 users:
  send this obj:
  `{"userIdExport": 5555,"userIdImport": 4444,"moneyToTransfer": 2}`
  in post `http://localhost:3001/api/transfer_money`
- add new user:
  send this obj:
  `{"firstName":"itzik","lastName":"shviro","userId":4444,"money":2359}`
  in post `http://localhost:3001/api/insertUser`
- get all the users:
  get `http://localhost:3001/api/get_users`

> in history-service:

- There is no need to independently enter a history because the other service communicating with this service performs this operation automatically
  post `http://localhost:3002/api/insertHistory`
- get all the history payments:
  get `http://localhost:3002/api/get_history_payments`

## Project Author

| Full Name     | Email               | Phone      | GitHub                               | LinkedIn                                                         |
| ------------- | ------------------- | ---------- | ------------------------------------ | ---------------------------------------------------------------- |
| Eran Samimian | eransam21@gmail.com | 0524258058 | [GitHub](https://github.com/eransam) | [LinkedIn](https://www.linkedin.com/in/eran-samimian-6b897a233/) |
