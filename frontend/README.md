# Transaction Tracking App

This project is a transaction tracking application that allows users to make payments using TRC20 tokens. The application consists of a backend built with Node.js and a frontend developed using React. 

## Features

- **User Registration**: Administrators can register wallet addresses in the database.
- **Payment Processing**: Users can make payments, which are tracked through assigned wallet addresses.
- **Transaction Tracking**: The application verifies payment status using the Tokenview API.
- **Virtual Money Management**: Successful payments increase the user's virtual money balance in the database.

## Project Structure

```
transaction-tracking-app
├── backend                # Backend application
│   ├── src
│   │   ├── app.js        # Entry point for the backend
│   │   ├── config
│   │   │   └── db.js     # Database configuration
│   │   ├── controllers
│   │   │   └── paymentController.js # Payment processing logic
│   │   ├── models
│   │   │   ├── user.js   # User model
│   │   │   └── wallet.js # Wallet model
│   │   ├── routes
│   │   │   └── paymentRoutes.js # API routes for payments
│   │   └── services
│   │       └── tokenviewService.js # Service for interacting with Tokenview API
│   ├── package.json      # Backend dependencies
│   └── README.md         # Backend documentation
├── frontend               # Frontend application
│   ├── public
│   │   └── index.html    # Main HTML file
│   ├── src
│   │   ├── components
│   │   │   ├── PaymentForm.js # Component for payment form
│   │   │   └── WalletStatus.js # Component for wallet status
│   │   ├── context
│   │   │   └── PaymentContext.js # Context for payment state management
│   │   ├── App.js        # Main React component
│   │   └── index.js      # Entry point for the React application
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
├── database
│   └── schema.sql        # SQL schema for database tables
└── README.md             # General project documentation
```

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd transaction-tracking-app
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

4. Set up the database:
   - Run the SQL schema in your MySQL database to create the necessary tables.

### Running the Application

1. Start the backend server:
   ```
   cd backend
   node src/app.js
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License.