import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading.jsx";

export const ProfilePage = () => {
  const [user, setUser] = useState(null); // acá guardo los datos del perfil
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        //hago fetch de la API
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include",
        });

        //si hay error, es porque no hay sesión, vuelvo al login
        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error obteniendo perfil:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login");
      } else {
        alert("No se pudo cerrar sesión");
      }
    } catch (error) {
      console.error("Error en logout:", error);
      alert("Error en el servidor");
    }
  };

  if (loading) return <Loading />;

  if (!user) return null;

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow p-4 card-soft-pink">
            <h2 className="fw-bold mb-3 text-pink">Mi perfil ✨</h2>

            <p className="mb-1">
              <strong>ID:</strong> {user.id}
            </p>
            <p className="mb-1">
              <strong>Nombre:</strong> {user.firstname}
            </p>
            <p className="mb-1">
              <strong>Apellido:</strong> {user.lastname}
            </p>
            <p className="mb-3">
              <strong>Username:</strong> {user.username}
            </p>

            <button
              className="btn btn-outline-danger fw-semibold"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
