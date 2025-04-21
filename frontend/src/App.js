import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PaymentForm from './components/PaymentForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <h1>Transaction Tracking App</h1>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/payment" component={PaymentForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;