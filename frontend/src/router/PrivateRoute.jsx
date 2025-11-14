import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Loading } from "../components/Loading"

//con este componente se "envuelven" las rutas privadas 
//se va a renderizar "children" solo si el usuario está autenticado
const PrivateRoute = ({ children }) => {
  
  //loading es el que va a indicar si estamos verificando la autenticación
  const [loading, setLoading] = useState(true)

  //"authenticated" se vuelve tre si es que la API confirma que hay un usuario logueado
  const [authenticated, setAuthenticated] = useState(false);

  //useEffect se ejecuta UNA vez cuand se monta el componente y llama al backend para verificar si hay una sesión activa 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http:localhost:3000/api/profile", { //se hace una peticion al endpoint 
          method: "GET",
          credentials: "include", //envia cookies
        });

        if (res.ok) {
          setAuthenticated(true) 
        } else {
          setAuthenticated(false)
        }
      } catch (error) {
        alert("Error verificando autenticación")
        console.error("Error: ", error);
        
      }
    }
  }, [])

  if (loading) return <Loading/> //si hay un loading, mostrar loading

  if (!authenticated) return <Navigate to = "/login"/> //si no está autenticado, redirigir a login


  return children //si está autenticado, se renderiza la página normalmente 
}

export default PrivateRoute
