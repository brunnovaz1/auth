// trabalha junto com o auth service e, a depender do retorno (se erro ou sucesso), faz o tratamento dos parâmetros recebidos

import { createContext, useState } from 'react'
import { login, logout } from '../services/AuthService'//importa as funções de login e logout do authservice.js


const UserContext = createContext({
  userId: null,
  logado: false,
  handleLogin: () => { },
  handleLogout: () => { },
})

export function UserContextProvider(props) {

  const [currentUser, setCurrentUser] = useState({ userId: null, logado: true })

  async function handleLogin(email, senha) { //tudo o que estiver relacionado a uma função originalmente assincrona deverá ser tbm assincrona
    try { //se correto
    const id = await login(email, senha) //chama a função login e retorna id do usuario, se ok
    setCurrentUser({ userId: id, logado: true }) //guarda id no contexto
    } catch (error) { //se erro
      throw Error(error.message) //devolve mensagem de erro
    }
  }

  async function handleLogout() {
    await logout() 
    setCurrentUser({ userId: null, logado: false })
  }

  const contexto = {
    userId: currentUser.userId,
    logado: currentUser.logado,
    handleLogin,
    handleLogout,
  }

  return (
    <UserContext.Provider value={contexto}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext