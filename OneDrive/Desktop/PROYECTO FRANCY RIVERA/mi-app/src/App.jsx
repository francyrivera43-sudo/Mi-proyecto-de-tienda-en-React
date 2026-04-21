import { useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  const agregarTarea = () => {
    if (texto.trim() === "") return;
    setTareas([...tareas, texto]);
    setTexto("");
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Mi lista de tareas</h1>

      <input
        type="text"
        placeholder="Escribe una tarea"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={agregarTarea}>Agregar</button>

      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea}
            <button onClick={() => eliminarTarea(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;