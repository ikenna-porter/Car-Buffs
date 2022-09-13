import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
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
          <Route path="models/form" element={<VehicleModelsForm />}></Route>
          <Route path="models" element={<VehicleModels />}></Route>
          <Route path="manufacturers" element={<Manufacturers />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
