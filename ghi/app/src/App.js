import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomibileForm from './routes/inventory/automobilesform';
import ManufacturersForm from './routes/inventory/manufacturersform';
import CustomerForm from './routes/sales/customerform';
import RepresentativesForm from './routes/sales/representativesform';
import SalesForm from './routes/sales/salesform';
import Representatives from './routes/sales/representatives';
import Representative from './routes/sales/representative';
import Sales from './routes/sales/sales';
import VehicleModels from './routes/inventory/VehicleModels'
import VehicleModelsForm from './routes/inventory/VehicleModelsForm'
import Manufacturers from './routes/inventory/Manufacturers';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inventory/automobiles/new" element = {<AutomibileForm />}/>
          <Route path = "/inventory/manufacturers/new" element={<ManufacturersForm/>}/>
          <Route path = "/sales/customers/new" element = {<CustomerForm/>}/>
          <Route path = "/sales/representatives/new" element = {<RepresentativesForm/>}/>
          <Route path = "/sales/transactions/new" element = {<SalesForm/>}/>
          <Route path = "/sales/representatives" element = {<Representatives/>}/>
          <Route path = "/sales/representatives/:id" element = {<Representative/>}/>
          <Route path = "/sales" element = {<Sales/>}/>
          <Route path="models/form" element={<VehicleModelsForm />}></Route>
          <Route path="models" element={<VehicleModels />}></Route>
          <Route path="manufacturers" element={<Manufacturers />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
