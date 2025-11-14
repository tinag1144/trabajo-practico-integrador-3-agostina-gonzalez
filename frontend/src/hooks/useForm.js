import { useState } from "react"

//inicializo el hook, q recibe un initialState que por default es un objeto vacio 
const useForm = (initialState = {}) => {
    //estado inicial del form
    const [formState, setFormState] = useState(initialState) 

    //funcion que maneja los cambios en el input 
    const handleChange = ({target}) => {
      const {name, value, type, checked} = target;

      //si el input es un checkbox, su valor es "checked", si es cualquier otro, uso value
      const newValue = type === "checkbox" ? checked : value;


      //actualizo el estado del form
      setFormState({
        ...formState,
        [name]: newValue //[name] es una propiedad que puede ser username, email, o lo q sea que hay en el input 
      })
    };

    //funcion que maneja el reset del form
    const handleReset = () => {
      setFormState(initialState)
    };

  return {
    formState,
    ...formState,
    handleChange,
    handleReset
  }
}

export default useForm
