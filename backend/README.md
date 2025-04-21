# Transaction Tracking Application - Backend

This backend application is designed to support transaction tracking for TRC20 payments using the TokenView API. It manages wallet addresses and user payments, ensuring that each user is assigned a unique wallet address for their transactions.

## Features

- **User Registration**: Administrators can register multiple wallet addresses in the MySQL database.
- **Payment Processing**: Users can initiate payments, which are tracked using the assigned wallet address.
- **Transaction Verification**: The application verifies the success of transactions using the TokenView service.
- **Virtual Money Management**: Upon successful payment, users' virtual money is updated in the database.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building the API.
- **MySQL**: Database for storing user and wallet information.
- **TokenView API**: Service for tracking TRC20 transactions.

## Project Structure

```
transaction-tracking-app
├── backend
│   ├── src
│   │   ├── app.js          # Entry point of the backend application
│   │   ├── config
│   │   │   └── db.js      # Database configuration and connection
│   │   ├── controllers
│   │   │   └── paymentController.js # Handles payment logic
│   │   ├── models
│   │   │   ├── user.js     # User model for database
│   │   │   └── wallet.js   # Wallet model for database
│   │   ├── routes
│   │   │   └── paymentRoutes.js # API routes for payment processing
│   │   └── services
│   │       └── tokenviewService.js # Service for interacting with TokenView API
│   ├── package.json        # NPM dependencies and scripts
│   └── README.md           # Documentation for the backend application
├── frontend
│   ├── public
│   │   └── index.html      # Main HTML file for the frontend
│   ├── src
│   │   ├── components
│   │   │   ├── PaymentForm.js # Component for payment submission
│   │   │   └── WalletStatus.js # Component for displaying wallet status
│   │   ├── context
│   │   │   └── PaymentContext.js # Context for payment state management
│   │   ├── App.js          # Main React component
│   │   └── index.js        # Entry point for the React application
│   ├── package.json        # NPM dependencies and scripts for the frontend
│   └── README.md           # Documentation for the frontend application
├── database
│   └── schema.sql          # SQL schema for creating necessary tables
└── README.md               # General documentation for the entire project
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd transaction-tracking-app/backend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up the database**:
   - Create a MySQL database and run the SQL schema located in `database/schema.sql`.

4. **Run the application**:
   ```
   node src/app.js
   ```

5. **API Documentation**:
   - Refer to the `paymentRoutes.js` file for available endpoints and their usage.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.