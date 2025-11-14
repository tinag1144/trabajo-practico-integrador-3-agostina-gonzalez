import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {

  //estado inicial del usuario (empieza en false pq se asume que no está logueado al principio)
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate(); //esto es para poder redirigir
  const location = useLocation(); //y esto es para obtener la info de la URL actual (/login, /home, /register, etc etc)

  //este useEffect se va a ejecutar cada vez que el usuario vaya a una nueva URL (location), esto es para que se verifique el estado de la autenticación en cada cambio de url 
  useEffect(() => {

    //función para verificar el perfil 
    const checkProfile = async () => {
      try {
        
        //se hace una petición GET a la API 
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include", //esto le dice al navegador que envie las cookies con la petición 
        });

        //acá el estado de autenticated se actualiza dependiendo de que si está todo ok (true) o no (false)
        setAuthenticated(res.ok);
      } catch (error) {
        console.error("Error verificando perfil:", error);
        setAuthenticated(false);
      }
    };

    //llamamos a la función 
    checkProfile();
  }, [location]); // si la ruta cambia, vuelvo a chequear sesión

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setAuthenticated(false);
        navigate("/login");
      } else {
        alert("No se pudo cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error cerrando sesión");
    }
  };

  return ( 
  //renderizado
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TP Integrador III
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* links de la izquierda */}
          <ul className="navbar-nav me-auto">
            {!authenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {authenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">
                    Tasks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* botón de logout a la derecha */}
          {authenticated && (
            <button
              className="btn btn-outline-light fw-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
