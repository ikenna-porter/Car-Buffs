import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileForm from './routes/inventory/automobilesform';
import ManufacturersForm from './routes/inventory/manufacturersform';
import CustomerForm from './routes/sales/customerform';
import RepresentativesForm from './routes/sales/representativesform';
import SalesForm from './routes/sales/salesform';
import Representatives from './routes/sales/representatives';
import Representative from './routes/sales/representative';
import Sales from './routes/sales/sales';
import VehicleModels from './routes/inventory/VehicleModels'
import VehicleModelsForm from './routes/inventory/VehicleModelsForm'
import Manufacturers from './routes/inventory/manufacturers';
import Automobiles from './routes/inventory/automobiles';
import TechnicianForm from './routes/services/TechnicianForm';
import Appointments from './routes/services/Appointments';
import AppointmentForm from './routes/services/AppointmentForm';
import AppointmentsHistory from './routes/services/AppointmentHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="automobiles">
              <Route path = "" element = {<Automobiles/>} />
              <Route path="new" element = {<AutomobileForm />} />
            </Route>
            <Route path="models">
              <Route path="" element={<VehicleModels />} />
              <Route path="new" element={<VehicleModelsForm />} />
            </Route>
            <Route path="manufacturers">
              <Route path="" element={<Manufacturers />} />
              <Route path="new" element={<ManufacturersForm/>} />
            </Route>
          </Route>
          <Route path = "sales">
            <Route path = "customers/new" element = {<CustomerForm/>}/>
            <Route path = "representatives">
              <Route path = "" element = {<Representatives/>}/>
              <Route path = "new" element = {<RepresentativesForm/>}/>
              <Route path = ":id" element = {<Representative/>}/>
            </Route>
            <Route path = "transactions">
              <Route path = "" element = {<Sales/>}/>
              <Route path = "new" element = {<SalesForm/>}/>
            </Route>
          </Route>
          <Route path="services/appointments">
            <Route path="" element= {<Appointments />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentsHistory />} />
          </Route>
          <Route path="services/technician/new" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
