// Example: Add a link to the payment page
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <Link to="/payment">
                <button>Go to Payment</button>
            </Link>
        </div>
    );
}

export default Dashboard; // Add this line to export the component as default