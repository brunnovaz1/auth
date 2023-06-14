import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listaTarefas, removeTarefa } from "../services/TaskService"


export default function HomeList() {
  const [tarefas, setTarefas] = useState([])      /*  novo */
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  async function carrega() {
    setLoading(true)
    const data = await listaTarefas()    /*  novo */
    setTarefas(data)
    setLoading(false)
    
  }

  useEffect(() => {
    
    carrega()
  },[])
  
  async function handleRemover(key){
    await removeTarefa(key)
    await carrega()
  }

  function handleEditar(key){
    navigate("/" + key)
  }

  return (
    <>
    {loading? <h3>Aguarde...</h3>:        /*  novo */
    <ol>
      {tarefas.map((tarefa, key) =>
        <li key={key}>{tarefa.nome} - {tarefa.prioridade}
          <button onClick={() => handleEditar()}>Editar</button>
          <button onClick={() => handleRemover(tarefa.key) }>Remover</button>
        </li>)}
    </ol>
}
    </>
  )
}