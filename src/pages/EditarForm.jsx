import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import TaskContext from "../contexts/TaskContext"
import { useContext } from "react"


export default function EditarForm() {
  
  const navigate = useNavigate()
  const {key} = useParams()
  const {tarefas, modificaTarefa} = useContext(TaskContext)
  const tarefa = tarefas.find((item) => item.key == key)
  const {register, handleSubmit} = useForm({
    defaultValues:{
      key: tarefa.key,
      nome: tarefa.nome
  }})
  

  async function onSubmit(data){           
    try{
      await modificaTarefa(data)     /* chamar a taskService*/
      navigate('/')                /* depois navegar para Home */
    } catch(error){
      console.log(error.message)
    }
 }
 
 
 return(
  <>
  <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("key")} />
      <div>
          <label>Nome da Tarefa</label>
          <input type='text' {...register("nome")} />
      </div>
      <div>
      <label>Prioridade</label>
      <select {...register("prioridade")}>
          <option selected={tarefa.prioridade == 1}value="1">Urgente</option>
          <option selected={tarefa.prioridade == 2}value="2">Importante</option>
          <option selected={tarefa.prioridade == 3}value="3">Normal</option>
      </select>
      </div>
      <button>Salvar</button>


  </form>
  </>
)
}