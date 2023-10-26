# Expense Tracker(Front-End(React))

## Capstone 2

Create a personal finance app for tracking income, expenses. Implement data visualization to help users analyze their financial trends.

**Host:** **[netlify](https://www.netlify.com)**
**The REACT APP (Expense Tracker) is online at:**
**https://expense-tracker-md.netlify.app**

**REST API**: **[https://expense-tracker-backend-jnmy.onrender.com (Expense Tracker HOME-MADE API) ](https://expense-tracker-backend-jnmy.onrender.com)**

**SCREENSHOT**:
![img](/src/assets/images/readme-files/expense-tracker-dashboard.jpg)

## JSON REST API components:
This application has been created using the following components:
- **ReactJS**
- **Vite** as a server
- **Vitest** as test library
- **Material UI** as base of the application styling
- **axios** for fetching data
- **react-apexcharts** for creating charts
- **sweetalert2** for the whole application dialog interactions

## Getting Started
To use this application, you will need to download and install [NodeJS](http://nodejs.org/download/).

Once you have NodeJS installed, you have two choices for downloading this source code:

1. Download & extract a **[zip file]**(https://github.com/doumbiasoft/capstone-two-expense-tracker-frontend/archive/master.zip) of the source
2. Fork this repository and git clone your fork

Next, you need to install the package dependencies by running the following command in the top-level directory of this source tree:
``` bash
npm install
```
Once the dependancies are installed, you can start the application server by running
``` bash
npm run dev
```
To execute all tests in this app run this command:
``` bash
npm run test
```

Once the server is running, you can access to the API by opening your browser to [http://localhost:5173](http://localhost:5173) OR [http://localhost:4173](http://localhost:4173).

To stop the server, press CTRL-C.

### APP USER FLOW

* **Create account**

To get access to the application you need to have an account. As a new user click on create an account link to go to the register page an account by providing your first, last name and email address.

* **Dashboard**

The dashboard displays all the information about your transactions activity by using graphical charts

* **Categories**

In this view, you can add , edit and delete a category of transaction.
To add a category you have to provide the name of the category and its type that could be "Expense" or "Income".

* **Transactions**

In this section, you can create, edit and delete a transaction.
A transaction is all Income or Expense you made.
To a transaction you have to pick a category, type the amount of the transaction, the date of the transaction and whether you want to add a note you can type a note.

* **Settings & Profile**

This section present information about the current user. In this view you edit your information, edit your password and delete your account.

### APP FEATURES

#### User Management:

* User registration and login.
* User profiles with personal information.
* Change password and email settings.

#### Security and Privacy:

* Ensure data security and user privacy through authentication and authorization mechanisms.
* Implement data encryption for sensitive information.

#### Transactions categories Management:

* Create, edit, and delete transactions categories.
* Expense Tracking:

* Add new expenses and Income to specific need.
* Categorize expenses and Income using pre-defined or custom categories.
* Edit and delete expenses and categories.


* Create custom expense categories.
* Edit and delete categories.
* Assign categories to expenses.

#### Transactions Analysis:

* Generate reports and charts to visualize spending by category over time.
* Track monthly and last 7 days trends in spending and earning.

#### Multi-User Support:

* Allow multiple users to create accounts and use the application independently.
Cloud Integration:

* Store user data securely in the cloud for easy access from multiple devices.

### FURTHER(Not implemented yet)

#### Export and Backup:

* Export data in common file formats (e.g., CSV, PDF).

#### Integration with Financial Services:

* Integration with financial institutions or services for automatic expense tracking.
