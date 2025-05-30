import "./App.css";
import VacanciesPage from "./component/Vacancies/VacanciesPage";
import Home from "./templates/Home";
import AdminLayout from "./templates/AdminLayout";
import Dashboard from "./component/adminSection/DashBoard/Dashboard";
import Sales from "./component/adminSection/DashBoard/Sales";
import ViewSite from "./component/adminSection/DashBoard/ViewSite";
import Products from "./component/adminSection/DashBoard/Products";
import Tags from "./component/adminSection/DashBoard/Tags";
import Analytics from "./component/adminSection/DashBoard/Analytics";
import Members from "./component/adminSection/DashBoard/Members";
import LecturerManagement from "./component/adminSection/DashBoard/LecturerManagement";
import DepartmentManagement from "./component/adminSection/DashBoard/DepartmentManagement";
import VacancyManagement from "./component/adminSection/DashBoard/VacancyManagement";
import ProtectedRoute from "./component/adminSection/ProtectedRoute";
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
          
          {/* Protected Dashboard - For all lecturers */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="sales" element={<Sales />} />
              <Route path="view-site" element={<ViewSite />} />
              <Route path="products" element={<Products />} />
              <Route path="tags" element={<Tags />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="members" element={<Members />} />
              <Route path="lecturer-management" element={<LecturerManagement />} />
              <Route path="department-management" element={<DepartmentManagement />} />
              <Route path="vacancy-management" element={<VacancyManagement />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
