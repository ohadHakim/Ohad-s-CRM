royal-crm
Mini CRM project aimed at managing customers, products and orders.

Tech Stack
*Node.js
*Express.js
*MySQL
*nodemon
\*Angular

Prepare The Environment:
1.Create a new MySQL database, follow instructions in the docs folder.
2.Clone project in vscode: https://github.com/levworkshop/royal-crm.git
3.Install dependencies in vscode terminal: npm install
4.Install nodemon globally: npm i -g nodemon and update package.json accordingly.
5.In project, add configuration file: config/dev.js containing the database connection details.
6.Install dependencies for Angular client:
*cd client-angular
*npm install

Run The App
Run the server:
Windows: set DEBUG=royal-crm:_; & npm start
MacOS/Linux: DEBUG=royal-crm:_ npm start

Run the client:
cd client-angular
ng serve
