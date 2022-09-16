import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <NavLink style={{color:"rgba(0, 0, 0, 0.8)"}} className="navbar-brand" to="/">CarCar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <NavLink style={{color:"black"}} className="nav-link" to="/sale" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sales
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/sales/transactions">Transactions</NavLink></li>
            <li><NavLink className="dropdown-item" to="/sales/transactions/new">New transaction</NavLink></li>
            <li><NavLink className="dropdown-item" to="/sales/representatives">Sales representatives</NavLink></li>
            <li><NavLink className="dropdown-item" to="/sales/representatives/new">New representative</NavLink></li>
            <li><NavLink className="dropdown-item" to="/sales/customers/new">New customer</NavLink></li>
            
          </ul>
        </li>
        <li className="nav-item dropdown">
          <NavLink style={{color:"black"}} className="nav-link" to="/service" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Service
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/services/appointments/">All Appointments</NavLink></li>
            <li><NavLink className="dropdown-item" to="/services/appointments/history">Your Appointments</NavLink></li>
            <li><NavLink className="dropdown-item" to="/services/appointments/new">Appointment Form</NavLink></li>
            <li><NavLink className="dropdown-item" to="/services/technician/new">Technician Form</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <NavLink style={{color:"black"}} className="nav-link" to="/inv" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Inventory
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/inventory/automobiles">Vehicles</NavLink></li>
            <li><NavLink className="dropdown-item" to="/inventory/automobiles/new">New Vehicle</NavLink></li>
            <li><NavLink className="dropdown-item" to="/inventory/manufacturers">Manufacturers</NavLink></li>
            <li><NavLink className="dropdown-item" to="/inventory/manufacturers/new">New Manufacturer</NavLink></li>
            <li><NavLink className="dropdown-item" to="/inventory/models">Vehicle Models</NavLink></li>
            <li><NavLink className="dropdown-item" to="/inventory/models/new">New Model</NavLink></li>
            
          </ul>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Nav;

//active and disabled are options
