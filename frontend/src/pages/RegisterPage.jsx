import React from 'react'
import useForm from '../hooks/useForm'


const initialForm = {
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
}

const Register = () => {
    //hook
    const {
        formState,
        handleChange,
        handleReset,
        username,
        email,
        password,
        firstname, 
        lastname
    } = useForm(initialForm)

    //que pasa cuando el usuario hace un submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Registro hecho, datos del user: ", formState)
        //AHORA, acá hago un "intento" de guardar el usuario en un localStorage
        try {
            localStorage.setItem('registeredUser', JSON.stringify(formState)) //se guarda en registeredUser Y lo convertimos a string para poder guardarlo en el localStorage pq sino no lo guarda ookk
            console.log("Esto es para ver si se guardó en el localstorage ono")
        } catch (error) {
            console.log("Error en el server")
        };

        handleReset();
    }
  return (
    <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input 
        type="text" 
        name='username'
        placeholder='username'
        value={username}
        onChange={handleChange}
        required
        />

        <input 
        type="text" 
        name='email'
        placeholder='email'
        value={email}
        onChange={handleChange}
        required
        />

        <input 
        type="password" 
        name='password'
        placeholder='password'
        value={password}
        onChange={handleChange}
        required
        />

        <input 
        type="text" 
        name='firstname'
        placeholder='firstname'
        value={firstname}
        onChange={handleChange}
        required
        />

        <input 
        type="text" 
        name='lastname'
        placeholder='lasname'
        value={lastname}
        onChange={handleChange}
        required
        />

        <button type='submit'>Registrarse</button>
    </form>
  )
}

export default Register
