# Transaction Tracking Application

This project is a transaction tracking application that allows users to make payments using TRC20 tokens. The application consists of a backend built with Node.js and a frontend developed using React. It tracks wallet addresses assigned to users and verifies payment statuses using the TokenView API.

## Project Structure

```
transaction-tracking-app
├── backend
│   ├── src
│   │   ├── app.js               # Entry point of the backend application
│   │   ├── config
│   │   │   └── db.js            # Database configuration and connection logic
│   │   ├── controllers
│   │   │   └── paymentController.js # Handles payment processing
│   │   ├── models
│   │   │   ├── user.js          # User model for database
│   │   │   └── wallet.js        # Wallet model for database
│   │   ├── routes
│   │   │   └── paymentRoutes.js  # Defines payment processing routes
│   │   └── services
│   │       └── tokenviewService.js # Interacts with TokenView API
│   ├── package.json              # Backend dependencies and scripts
│   └── README.md                 # Documentation for the backend
├── frontend
│   ├── public
│   │   └── index.html            # Main HTML file for the frontend
│   ├── src
│   │   ├── components
│   │   │   ├── PaymentForm.js    # Component for payment input
│   │   │   └── WalletStatus.js    # Component for displaying wallet status
│   │   ├── context
│   │   │   └── PaymentContext.js  # State management for payments
│   │   ├── App.js                # Main component of the React app
│   │   └── index.js              # Entry point of the React application
│   ├── package.json              # Frontend dependencies and scripts
│   └── README.md                 # Documentation for the frontend
├── database
│   └── schema.sql                # SQL schema for MySQL database
└── README.md                     # General documentation for the project
```

## Features

- **User Registration**: Administrators can register wallet addresses in the database.
- **Payment Processing**: Users can make payments using assigned wallet addresses.
- **Transaction Tracking**: The application tracks the status of transactions using the TokenView API.
- **Virtual Money Management**: Successful payments increase the user's virtual money in the database.

## Getting Started

### Prerequisites

- Node.js
- MySQL
- npm

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
     cd frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

4. Set up the database:
   - Run the SQL schema in your MySQL database.

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.