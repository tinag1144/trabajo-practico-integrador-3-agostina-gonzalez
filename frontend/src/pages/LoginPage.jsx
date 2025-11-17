import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import useForm from "../hooks/useForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { formState, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Credenciales inválidas");
        handleReset();
        return;
      }

      // Si el login es correcto, lo mandamos al Home.
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
      handleReset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container d-flex justify-content-center align-items-center min-vh-100">
      {loading && <Loading />}

      <div className="col-12 col-md-6 col-lg-4">
        <div className="card shadow p-4 card-soft-pink">
          <h1 className="text-center mb-4 fw-bold text-pink">
            Welcome back 💖
          </h1>

          <form onSubmit={handleLogin} className="mb-3">
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="tu usuario"
                value={formState.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="*******"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="fw-semibold text-pink-link">
              Registrate acá
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
