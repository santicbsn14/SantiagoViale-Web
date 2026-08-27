
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './Pages/PortfolioPage';
import AdminPage from './Pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
