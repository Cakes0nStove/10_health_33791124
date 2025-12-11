# Vitacore

![alt text](public/images/image.png)

A simple vitamin shop web application built with Node.js, Express, MySQL, and EJS — part of a Goldsmiths Computing & IT assignment. Users can browse vitamins, add them to a cart, checkout with a fake payment flow, register/login, and manage profile pictures. Alongside with this users can completed a personalised quiz that will recommend them a vitamin.

# Technologies used

[![CSS3][CSS3-shield]][CSS3-url]
[![JavaScript][JavaScript-shield]][JavaScript-url]
[![Node.js][NodeJS-shield]][NodeJS-url]
[![Express.js][Express-shield]][Express-url]
[![EJS][EJS-shield]][EJS-url]



[CSS3-shield]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

[JavaScript-shield]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[NodeJS-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[NodeJS-url]: https://nodejs.org/

[Express-shield]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

[EJS-shield]: https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge&logo=ejs&logoColor=white
[EJS-url]: https://ejs.co/


## 📦 Key Features

- **Browse vitamins** with pricing and descriptions
- **Add to cart** and view cart with quantity and total
- **Session-based cart** persisted through navigation
- **Checkout page** with selection of fake payment methods
- **User registration & login**
- **User profile page** with profile picture upload
- **MySQL database** integration with secure hashed passwords
- **Express session for login state**
- **Server-side validation and sanitization**

---


## 🛠 Packages Used

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express | Web framework |
| MySQL | Database |
| EJS | Templating engine |
| bcrypt | Password hashing |
| multer | File uploads |
| express-session | Session management |
| express-validator | Input validation |
| express-sanitizer | Clean input |
| dotenv | Environment variables |

---

## 🚀 Getting Started

### 🧩 Prerequisites

Make sure you have:

- Node.js (v16+)
- MySQL
- npm

---

## 📦 Installation

1. Clone the repository and execute the following commands:

   ```bash
   git clone https://github.com/Cakes0nStove/10_health_33791124
   npm install
Note: Npm install will install all libaries and packages from package.json

2. Set up database

   ```bash
    mysql -u root -p < create_db.sql
    mysql -u root -p health < insert_test_data.sql

Note: Make sure you had SQL installed!

3. Start the server
    ```
    node index.js
    ```

4. Open in browser
    ```
    http://localhost:8000

<h2>Route Description</h2>

| Page / Route                                | Description                                                          |
| ------------------------------------------- | -------------------------------------------------------------------- |
| 🏠 **Home** (`/`)                           | Main homepage of the application                                     |
| 🛍 **Browse Vitamins** (`/shop/browse`)     | Displays all available vitamins with prices and “Add to Cart” option |
| 💳 **Checkout** (`/shop/checkout`)          | Shows all cart items, total price, and payment method selection      |
| ➕ **Add Vitamin** (`/vitamins/add`)         | Admin page to manually add a new vitamin to database                 |
| 🔎 **Search Vitamins** (`/vitamins/search`) | Search form allowing users to find vitamins by name                  |
| 📋 **Vitamin Survey** (`/vitamins/survey`)  | Basic survey page collecting user preferences                        |
| 📝 **Register** (`/users/register`)         | Creates a new user account (name, email, password)                   |
| 🔐 **Login** (`/users/login`)               | Login page for returning users                                       |
| 🚪 **Logout** (`/users/logout`)             | Logs out the current user                                            |
| 👥 **User List** (`/users/list`)            | Displays all registered users (admin-style page)                     |
| 🙍 **User Profile** (`/users/profile`)      | Shows profile info and allows profile picture upload                 |

