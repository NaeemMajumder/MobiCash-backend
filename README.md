🛡️ MobiCash Backend - Secure Digital Transaction API

## 📌 Project Overview
MobiCash Backend is the server-side API for the MobiCash platform, designed to manage digital transactions efficiently. Built using the MERN stack, it provides secure endpoints for users, agents, and administrators, ensuring seamless transactions, authentication, and financial operations. The backend follows the MVC (Model-View-Controller) architecture to maintain a clean and scalable code structure.

## 🌐 Live Links
- Backend API: [MobiCash Backend](https://mobi-cash-backend.vercel.app/)

## 🛠️ Technologies Used
- **Framework:** Express.js
- **Database:** MongoDB (Local for development, MongoDB Atlas for production)
- **ODM:** Mongoose
- **Authentication:** JWT-based authentication with bcrypt password hashing
- **Security:** CORS and dotenv for environment variable management

## 📦 Dependencies
The backend uses the following dependencies:

```json
{
  "name": "mobicash-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.13.1",
    "mongoose": "^8.10.1",
    "nodemon": "^3.1.9",
    "uuid": "^11.1.0"
  }
}
```

## 🛠 Installation and Setup (Local Development)

### 📍 Prerequisites
- Node.js
- MongoDB (Local or MongoDB Atlas)

### 📂 Backend Setup
```bash
git clone <https://github.com/NaeemMajumder/MobiCash-backend>
cd backend
npm install
```

### 🔑 Set up environment variables in `.env` file:
```env
PORT=8080
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

### 🚀 Run the development server:
```bash
npm run dev
```

## 🚀 API Features
- **User Authentication:** Secure login and registration with JWT and bcrypt hashing.
- **User Roles:** Distinct roles for users, agents, and admins to control access levels.
- **Financial Transactions:** Users can send money, cash out, and check their balance securely.
- **Admin Management:** Admins can monitor transactions, approve agents, and ban/unban users.
- **Data Security:** Follows best practices for data encryption and secure communication.

## 📢 Future Enhancements
- **Advanced Transaction Analytics:** Insights into user transactions and patterns.
- **Multi-Currency Support:** Expand to support international transactions.
- **Blockchain Integration:** Immutable transaction records for enhanced security.
- **Automated Fraud Detection:** AI-based monitoring of unusual financial activities.

## 🤝 Contribution
We welcome contributions! Feel free to fork the repository and submit a pull request. If you have any suggestions, open an issue to discuss new features.

🚀 Empowering users with a secure and seamless digital transaction experience!

