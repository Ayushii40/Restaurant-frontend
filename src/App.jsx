import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from "./Pages/Home";
import Success from "./Pages/Success";
import NotFound from "./Pages/NotFound";
import MenuPage from "./Pages/MenuPage";
import DishDetail from "./Pages/DishDetail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import ReservationPage from "./Pages/ReservationPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/dish/:id' element={<DishDetail />} />
          <Route path='/success' element={<Success />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reservation' element={<ReservationPage />} />
          <Route 
            path='/admin/dashboard' 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  )
}

export default App
