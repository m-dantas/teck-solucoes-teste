import { User } from "~/types/User"
import sharedUsers from "./data"
export default defineEventHandler(async (event) => {
    const body: User = await readBody(event)
    const verifyValues = Object.values(body)
        .map(item => item !== "") // Transforma em bool os dados
        .every(item => item === true) // verifica se todos estão preenchidos
    if (!verifyValues) {
        setResponseStatus(event, 400)
        return { sucesso: false, data: [] }
    }
        
    const verifyIfNotExist = sharedUsers.filter(user => user.cpf === body.cpf || user.email === body.email)
    if (verifyIfNotExist.length > 0) { // Se entrar aqui, quer dizer que existe
        return { sucesso: false, data: [] }
    }
    sharedUsers.push(body)
    return { sucesso: true, data: body }
})