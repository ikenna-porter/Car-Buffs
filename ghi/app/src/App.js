import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomibileForm from './routes/inventory/automobilesform';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inventory/automobiles/new" element = {<AutomibileForm />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
