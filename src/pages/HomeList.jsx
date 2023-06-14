import { useEffect, useState } from "react"
import { listaTarefas, removeTarefa } from "../services/TaskService"


export default function HomeList() {
  const [tarefas, setTarefas] = useState([])      /*  novo */
  const [loading, setLoading] = useState(false)
  
  async function carrega() {
    setLoading(true)
    const data = await listaTarefas()    /*  novo */
    setTarefas(data)
    setLoading(false)
    
  }

  useEffect(() => {
    
    carrega()
  },[])
  
  async function handleClick(key){
    await removeTarefa(key)
    await carrega()
  }

  return (
    <>
    {loading? <h3>Aguarde...</h3>:        /*  novo */
    <ol>
      {tarefas.map((tarefa, key) =>
        <li key={key}>{tarefa.nome} - {tarefa.prioridade}
          <button onClick={() => handleClick(tarefa.key) }>Remover</button>
        </li>)}
    </ol>
}
    </>
  )
}