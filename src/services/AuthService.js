// TODO: implementar integracao com Firebase/
// Apenas consulta ao backend. Somente retorno se erro ou sucesso

import{ getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './FirebaseConfig'

const auth = getAuth(app) // função de autenticação do Firebase


export async function login (email, senha) { //função assincrona para aguardar a validação do usuário
    return await signInWithEmailAndPassword (auth, email, senha) // return: retorna uid do usuario auth: função firebase, email e senha: parâmetros recebidos para validação //await para que a função aguarde o retorno da validação
    .then((userCredential) => userCredential.user.uid)//traz a ID do usuário se login ok
    //se der certo devolve credenciais do usuario cadastrado no firebase
    .catch((error) => {//se der erro 
        if(error.code == 'auth/wrong-password') {// error code possui valores pré definidos no pacote 'wrong-password' é uma delas
            throw Error('Senha inválida!') //mensagem amigável para o usuário
        }else if(error.code == 'auth/user-not-found'){// error code possui valores pré definidos no pacote 'user-not-found' é uma delas
            throw Error ('Usuário não encontrado!') //mensagem amigável para o usuário
        }
        }) 

}

export async function logout () {
    signOut(auth) //chama a função signout do Firebase
}