import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { modificaTarefa } from "../services/TaskService"

export default function EditarForm() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const {key} = useParams()
 
  
  async function onSubmit(data){           
    try{
      await modificaTarefa(data)     /* chamar a taskService*/
      navigate("/")                /* depois navegar para Home */
    } catch(error){
      console.log(error.message)
    }
 }
 
 return(
  <>
  <form onSubmit={handleSubmit(onSubmit)}>
      <div>
          <label>Nome da Tarefa</label>
          <input type='text' {...register("nome")}/>
      </div>
      <div>
      <label>Prioridade</label>
      <select {...register("prioridade")}>
          <option value="1">Urgente</option>
          <option value="2">Importante</option>
          <option value="3">Normal</option>
      </select>
      </div>
      <button>Salvar</button>


  </form>
  </>
)
}