import { Loading } from "../components/Loading.jsx";
import { useForm } from "../hooks/useForm.js";

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // empieza en null, si le llega algo es pq la tarea se está editando

  const { formState, handleChange, handleReset, setFormState } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const getTasks = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setTasks([]);
        return;
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      setTasks([]);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      // validación básica 
      if (!formState.title.trim()) {
        alert("El título es obligatorio");
        return;
      }

      if (editingTask) {
        // si se está editando alguna tarea, hace el fetch de su id y modifica lo que está ahí
        const res = await fetch(
          `http://localhost:3000/api/tasks/${editingTask.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formState),
          }
        );

        // const data = await res.json();

        if (!res.ok) {
          alert( "Error al editar la tarea");
          return;
        }

        alert("Tarea actualizada ");
      } else {
        //sino, si se está creando una tarea, hace un POST en la API
        const res = await fetch("http://localhost:3000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formState),
        });

        const data = await res.json();

        if (!res.ok) {
          alert("Error al crear la tarea");
          return;
        }

        alert("Tarea creada");
      }

      setEditingTask(null);
      handleReset();
      getTasks();
    } catch (error) {
      console.error("Error guardando tarea:", error);
      alert("Error en el servidor");
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setFormState({
      title: task.title || "",
      description: task.description || "",
      is_completed: Boolean(task.is_completed),
    });
  };

  const handleDelete = async (taskId) => {
    const ok = window.confirm("¿Seguro que querés eliminar esta tarea?"); //el window.confirm le da al usuario un pequeño dialogo donde puede poner una opción y a partir de ahí vemos que como seguimos operando 
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al eliminar la tarea");
        return;
      }

      alert("Tarea eliminada ");
      getTasks();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      alert("Error en el servidor");
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...task,
          is_completed: !task.is_completed,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("No se pudo actualizar el estado");
        return;
      }

      getTasks();
    } catch (error) {
      console.error("Error cambiando estado:", error);
      alert("Error en el servidor");
    }
  };

  if (loadingList) return <Loading />;

return (
  <div className="container py-4">
    {/* Título principal y descripción */}
    <h2 className="fw-bold mb-3 text-pink">Mis tareas </h2>
    <p className="text-muted">
      Acá podés crear nuevas tareas, editarlas, marcarlas como completadas o eliminarlas.
    </p>

    {/* FORMULARIO DE TAREA */}
    <div className="card shadow-sm mb-4 card-soft-pink">
      <div className="card-body">

        {/* Si editingTask existe, el usuario está editando. Si no, está creando una nueva */}
        <h5 className="card-title mb-3">
          {editingTask ? "Editar tarea" : "Crear nueva tarea"}
        </h5>

        {/* Cuando envío el formulario, llamo a handleSubmit */}
        <form onSubmit={handleSubmit}>

          {/* Input del título de la tarea */}
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formState.title}  // este valor viene del custom hook useForm
              onChange={handleChange}   // actualiza el estado cuando escribo
              placeholder="Ej: Estudiar React"
              required
            />
          </div>

          {/* Input de descripción */}
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="description">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formState.description}
              onChange={handleChange}
              placeholder="Detalles de la tarea"
            />
          </div>

          {/* Checkbox de completado */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="is_completed"
              name="is_completed"
              checked={formState.is_completed}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="is_completed">
              Marcar como completada
            </label>
          </div>

          {/* Botones de Guardar o cancelar edición */}
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary fw-semibold"
              disabled={saving}  // esto lo desactivo mientras se guarda para evitar clics dobles
            >
              {/* Texto dinámico según si estoy editando o creando */}
              {saving
                ? "Guardando..."
                : editingTask
                ? "Actualizar tarea"
                : "Crear tarea"}
            </button>

            {/* Si estoy editando muestro el botón de cancelar */}
            {editingTask && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setEditingTask(null); // salgo del modo edición
                  handleReset(); // limpio el formulario
                }}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>
    </div>

    {/* LISTA DE TAREAS */}

    {/* Si no hay tareas, muestro un mensaje de vacío */}
    {tasks.length === 0 ? (
      <p className="text-muted">No tenés tareas todavía. Creá la primera </p>
    ) : (
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {/* Recorro todas las tareas para dibujar filas en la tabla */}
            {tasks.map((task) => {
              const isCompleted = task.is_completed;

              // Tomo la fecha que exista en el objeto
              const date =
                task.date ||
                task.created_at ||
                task.updated_at ||
                "";

              return (
                <tr key={task.id}>

                  {/* Título, con tachado si está completada */}
                  <td className={isCompleted ? "text-decoration-line-through" : ""}>
                    {task.title}
                  </td>

                  {/* Descripción idem (funciona igual que el título) */}
                  <td className={isCompleted ? "text-decoration-line-through" : ""}>
                    {task.description}
                  </td>

                  {/* Badge de estado */}
                  <td>
                    <span
                      className={
                        "badge " +
                        (isCompleted ? "bg-success" : "bg-warning text-dark")
                      }
                    >
                      {isCompleted ? "Completada" : "Pendiente"}
                    </span>
                  </td>

                  {/* Fecha formateada si existe */}
                  <td>{date ? new Date(date).toLocaleDateString() : "-"}</td>

                  {/* Botones */}
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">

                      {/* Botón editar */}
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEditClick(task)}
                      >
                        Editar
                      </button>

                      {/* Botón eliminar */}
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        Eliminar
                      </button>

                      {/* Botón toggle de completado */}
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleToggleCompleted(task)}
                      >
                        {isCompleted ? "Marcar pendiente" : "Marcar done"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
};
