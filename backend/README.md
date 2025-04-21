# Transaction Tracking Application - Backend

This backend application is designed to support transaction tracking for TRC20 payments using the TokenView API. It manages wallet addresses and user payments, ensuring that each user is assigned a unique wallet address for their transactions.

## Features

- **User Registration**: Administrators can register multiple wallet addresses in the MySQL database.
- **Payment Processing**: Users can initiate payments, which are tracked using the assigned wallet address.
- **Transaction Verification**: The application verifies the success of transactions using the TokenView service.
- **Webhook Integration**: Automatically handles webhook notifications from TokenView to update transaction statuses.
- **Virtual Money Management**: Upon successful payment, users' virtual money is updated in the database.
- **Dynamic Webhook Setup**: Automatically sets the webhook URL on server startup.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building the API.
- **MySQL**: Database for storing user and wallet information.
- **Sequelize**: ORM for managing database models and queries.
- **TokenView API**: Service for tracking TRC20 transactions.
- **bcrypt**: For secure password hashing.
- **dotenv**: For managing environment variables.

## Project Structure

```
transaction-tracking-app
├── backend
│   ├── src
│   │   ├── app.js          # Entry point of the backend application
│   │   ├── config
│   │   │   └── db.js       # Database configuration and connection
│   │   ├── controllers
│   │   │   └── paymentController.js # Handles payment logic
│   │   ├── models
│   │   │   ├── user.js     # User model for database
│   │   │   └── wallet.js   # Wallet model for database
│   │   ├── routes
│   │   │   ├── userRoutes.js    # API routes for user management
│   │   │   └── paymentRoutes.js # API routes for payment processing
│   │   └── services
│   │       └── tokenviewService.js # Service for interacting with TokenView API
│   ├── database
│   │   └── schema.sql      # SQL schema for creating necessary tables
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
└── README.md               # General documentation for the entire project
```

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14 or higher recommended).
- **MySQL**: Set up a MySQL database for storing user and wallet information.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd transaction-tracking-app/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Create a MySQL database.
   - Run the SQL schema located in `database/schema.sql` to create the necessary tables.

4. **Configure environment variables**:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=your_database_name
     SERVER_PROTOCOL=http
     SERVER_HOST=localhost
     PORT=5000
     CLIENT_ORIGIN=http://localhost:3000
     TOKENVIEW_API_KEY=your_tokenview_api_key
     ```

5. **Run the application**:
   ```bash
   node src/app.js
   ```

6. **Test the API**:
   - Use Postman or `curl` to test the available endpoints.

## API Endpoints

### User Routes

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in a user.

### Payment Routes

- **POST /api/payments/assign-wallet**: Assign a wallet to a user.
- **GET /api/payments/payment-status/:transactionId**: Check the payment status of a transaction.
- **POST /api/payments/webhook**: Handle webhook notifications from TokenView.
- **POST /api/payments/set-webhook**: Dynamically set the webhook URL.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [TokenView API](https://tokenview.com/) for providing transaction tracking services.
- [Sequelize](https://sequelize.org/) for simplifying database interactions.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for secure password hashing.