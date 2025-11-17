import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading.jsx";

// Todo lo que vaya dentro de <PrivateRoute>...</PrivateRoute> viene acá como 'children'.
// Acá lo muestro solo si el usuario está autenticado.
export const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); 
  const [authenticated, setAuthenticated] = useState(false);

  //se ejecuta solo una vez, se hace una consulta al backend para ver si el usuario tiene una sesipon activa 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        //y acá se consulta si existe la cookie (cookie = sesión activa )
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include",
        });

        setAuthenticated(res.ok);
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loading />;

  //si no está autenticado, manda al login de nuevo 
  if (!authenticated) return <Navigate to="/login" />;

  //Retorno todo el componente 

  return children;
};
