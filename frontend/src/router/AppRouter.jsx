import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

import { PrivateRoute } from "./PrivateRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";

import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { TasksPage } from "../pages/TasksPage.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Navbar arriba en todas las páginas */}
      <Navbar />

      {/* Contenedor central de las páginas */}
      <main className="flex-grow-1">
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Si entra a "/" lo mando al login por defecto */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* RUTAS PRIVADAS */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Cualquier ruta random , me lleva al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>

    
      <Footer />
    </BrowserRouter>
  );
};
