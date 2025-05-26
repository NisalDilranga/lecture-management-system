import "./App.css";
import VacanciesPage from "./component/Vacancies/VacanciesPage";
import Home from "./templates/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      
      
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
           <Route path="/vacancies" element={<VacanciesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
