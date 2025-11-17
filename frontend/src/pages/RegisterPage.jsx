import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading.jsx";
import { useForm } from "../hooks/useForm.js";
export const RegisterPage = () => {
  const navigate = useNavigate();

  const { formState, handleChange, handleReset } = useForm({ //seteo los valores iniciales del form de registro
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  //manejo del loading
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    //defino los nuevos valores del form
    const payload = {
      name: formState.firstname,  
      lastname: formState.lastname,
      username: formState.username,
      email: formState.email,
      password: formState.password,
    };

    // console.log("PAYLOAD ENVIADO DESDE EL FRONT:", payload);

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //Esto sirve para avisarle al servidor que el cuerpo de mi solicitud viene en formato json, asi ya sabe que esperar y pueda procesar correctamente la carga de la solicitud.
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al registrarse");
        return;
      }

      alert("Registro exitoso, bienvenido/a");
      handleReset();
      navigate("/home");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el servidor. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container d-flex justify-content-center align-items-center min-vh-100">
      {loading && <Loading />}

      <div className="col-12 col-md-7 col-lg-5">
        <div className="card shadow p-4 card-soft-pink">
          <h2 className="text-center fw-bold mb-4 text-pink">
            Crea tu cuenta 
          </h2>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formState.username}
                onChange={handleChange}
                placeholder="agosdev"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="firstname">
                Firstname
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={formState.firstname}
                onChange={handleChange}
                placeholder="Agostina"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="lastname">
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={formState.lastname}
                onChange={handleChange}
                placeholder="González"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="dni">
                DNI
              </label>
              <input
                type="number"
                className="form-control"
                id="dni"
                name="dni"
                value={formState.dni}
                onChange={handleChange}
                placeholder="12345678"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 fw-bold btn-pink-alt"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Registrarme"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="fw-semibold text-pink-link">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
