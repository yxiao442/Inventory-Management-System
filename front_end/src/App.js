import logo from './logo.svg';
import './App.css';
import  LoginForm from './Components/LoginForm/LoginForm.jsx';
import  Dashboard from './Components/Dashboard/Dashboard.jsx';
import  Inventory from './Components/Dashboard/Inventory/Inventory.jsx';
import {BrowserRouter as Router, Switch, Route, Link, Routes,} from "react-router-dom";
import {DashboardLayout} from "@toolpad/core";
function App() {
  return (
    // <div>
    //    <LoginForm />
    // </div>
      <Router>
          <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/*<Route path="/dashboard/invenroty" element={<Dashboard />} />*/}

          </Routes>
      </Router>
  );
}

export default App;
