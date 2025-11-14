import useForm from "../hooks/useForm"
import {Link, useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import { useState } from "react"


//estado inicial del Login
const initialForm = {
    username: "",
    password: "",
};
const LoginPage = () => {

    //llamo el useNavigate para poder redirigirme a otras paginas 
    // const navigate = useNavigate();

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
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true) //"prendo" el loading

        console.log("Inicio de sesion ")


    }


return (
    //estructura el formulario

    <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input 
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={handleChange}
        required
        />

        <input 
        type="password" 
        name="password"
        placeholder="password"
        value={password}
        onChange={handleChange} 
        required 
        />

        <button type="submit" >Iniciar Sesión</button>
    </form>
  )
}

export default LoginPage
