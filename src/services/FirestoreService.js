import { app } from "./FirebaseConfig";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);

export async function listaTarefas() {
  const tarefas = [];
  const resposta = await getDocs(
    query(collection(db, "tarefas"), where("prioridade", "==", 1))
  );
  resposta.forEach((doc) => {
    tarefas.push({ key: doc.id, ...doc.data() });
  });
  return tarefas;

  /*  .then ((querySnapshot) => { })    substituido pelas linhas acima
    .catch((error) => {throw Error("Deu ruim!")}) */
}

export async function insereTarefa(tarefa) {}
export async function modificaTarefa(tarefa) {}
export async function removeTarefa(key) {}
