import { useEffect, useState } from "react"
import { listaTarefas } from "../services/TaskService"


export default function HomeList() {
  const [tarefas, setTarefas] = useState([])      /*  novo */
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    async function carrega() {
      setLoading(true)
      const data = await listaTarefas()    /*  novo */
      setTarefas(data)
      setLoading(false)
      
    }
    carrega()
  },[])
  
  return (
    <>
    {loading? <h3>Aguarde...</h3>:        /*  novo */
    <ol>
      {tarefas.map((tarefa, key) => <li key={key}>{tarefa.nome} - {tarefa.prioridade}</li>)}
    </ol>
}
    </>
  )
}