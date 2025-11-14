import { useEffect, useState } from "react";
import { Loading } from "../components/Loading.jsx";
import { Link } from "react-router-dom";

export const HomePage = () => {
  //estado inicial de tasks, guarda un ARRAY de tareas
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true);

  //buscar las tareas de la API 
  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        method: "GET",
        credentials: "include", 
      });

      //si hay un error
      if (!res.ok) {
        //actualiza el estado de nuevo a un array vacío 
        setTasks([]);
        return; //return para no continuar 
      }

      //si todo fue bien, se actualiza el estado con la data 
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      
      setTasks([]);
    } finally { //el finally se ejecuta SIEMPRE, sin importar si hubo un error o no, esto es mas que nada para que el estado del loading siempre esté en falso asi no se muestra 
      setLoading(false);
    }
  };

  useEffect(() => {
    //llamamos a la función anterior 
    getTasks();
  }, []); //se ejecuta en el inicio 

  //si loading es true, muestra el componente Loading 
  if (loading) return <Loading />;


  //si pasa por acá es pq loading es false 

  //bueno lo que entendí de esto es que 
  const total = tasks.length; //esto guarda la cantidad total de elementos en el array tasks
  const completed = tasks.filter((t) => t.is_completed).length;//acá, el .filter va a recorrer cada elemento del array (t), y la t es lo que representa a cada elemento de ese array. Entonces, el filter va a contar cuantas tienen is_completed = true
  const pending = total - completed; //y con esto saca por logica y diferencia, del total de tareas, todas las que estan pendientes

  return (
    <div className="container py-4">
      <h1 className="mb-3 fw-bold text-pink">Hola de nuevo 💕</h1>
      <p className="text-muted">
        Este es tu panel principal. Acá tenés un resumen rápido de tus tareas.
      </p>

      <div className="row g-3 mt-3">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm card-soft-pink">
            <div className="card-body text-center">
              <h5 className="card-title">Total de tareas</h5>
              <p className="display-6 fw-bold">{total}</p> {/* llamo a  total*/}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm card-soft-pink">
            <div className="card-body text-center">
              <h5 className="card-title">Completadas</h5>
              <p className="display-6 fw-bold text-success">{completed}</p> {/* llamo a  completed*/}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm card-soft-pink">
            <div className="card-body text-center">
              <h5 className="card-title">Pendientes</h5>
              <p className="display-6 fw-bold text-warning">{pending}</p> {/* llamo a  pending*/}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/tasks" className="btn btn-primary fw-semibold">
          Ver y gestionar mis tareas
        </Link>
      </div>
    </div>
  );
};
