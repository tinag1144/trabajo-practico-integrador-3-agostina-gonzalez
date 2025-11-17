import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading.jsx";

export const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  //usa casi toda la misma lógica que el register, nada más que acá digo que, si está autenticado, lo mando directo al home 
  if (authenticated) return <Navigate to="/home" />;

  return children;
};
