import useForm from "../hooks/useForm"
import {Link, useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import { useState } from "react"


//estado inicial del Login
const initialForm = {
    username: "",
    password: "",
};
const LoginPage = ({ onLogin }) => {

    //llamo el useNavigate para poder redirigirme a otras paginas 
    const navigate = useNavigate();

    //llamo al useFor para manejar el estado del formulario 
    const {
            formState, 
            handleChange,
            handleReset,
            username,
            password
        } = useForm(initialForm)

    //seteo el estado del loading 
    const [loading, setLoading] = useState(false) //inicialmente no muestra el "cargando"

    //que pasa cuando el user hace submit 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true) //"prendo" el loading

        console.log("Inicio de sesion ")


        try {
            const res = await fetch ("http:localhost:3000/api/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "applications-json", //aviso q envio un json
                    credentials: "include", //con esto se pueden enviar cookies entre frontend y backend 
                    body: JSON.stringify(formState)// y acá conveirto el formulario a json
                }
            });

            //convierto la respuesta en un json tmb
            const data = await res.json();

            if(!res.ok) {
                alert("Credenciales inválidas")
                handleReset();
                return;
            }

            //"activamos" el login para avisarle al componente padre que el usuario está logueado
            onLogin();

            //una vez logueado, lo redirigimos a home
            navigate("/home")
        } catch (error) {
            console.log(error)
            alert("Error en el servidor")
        };
    };

return (
    // Contenedor principal centrado en toda la pantalla (Bootstrap)
    <main className="container d-flex justify-content-center align-items-center min-vh-100">
      
      {/* Si loading es true, mostramos el componente Loading */}
      {loading && <Loading />}

      {/* Columna con ancho adaptable según la pantalla */}
      <div className="col-12 col-md-6 col-lg-4">

        {/* Card que contiene el formulario */}
        <div className="card shadow p-4">

          {/* Encabezado del formulario */}
          <h1 className="text-center mb-4 fw-bold">Welcome</h1>

          {/* Formulario controlado */}
          <form onSubmit={handleLogin} className="mb-3">

            {/* Campo Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="your username"
                className="form-control"
                id="username"
                value={formState.username} // Estado del input
                onChange={handleChange}    // Función del custom hook
                required
              />
            </div>

            {/* Campo Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="*******"
                className="form-control"
                id="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold"
              disabled={loading} // Deshabilitado mientras el backend procesa
            >
              {/* Cambiamos el texto dinámicamente según estado loading */}
              {loading ? "Loading..." : "Enter TP3"}
            </button>
          </form>

          {/* Link hacia register */}
          <p className="text-center mt-3">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="fw-semibold text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage
