import { v4 as uuidv4 } from "uuid"
import { User } from "~/types/User"
import sharedUsers from "./data"
export default defineEventHandler(async (event) => {
    const body: User = await readBody(event)
    const verifyValues = Object.values(body).every(item => item !== "")

    if (!verifyValues) {
        setResponseStatus(event, 400)
        return { success: false, message: 'Erro ao processar requisição', data: [] }
    }
        
    const verifyIfNotExist = sharedUsers.filter(user => user.cpf === body.cpf || user.email === body.email)
    if (verifyIfNotExist.length > 0) { // Se entrar aqui, quer dizer que existe
        setResponseStatus(event, 409)
        return { success: false, message: 'E-mail ou CPF já registrados', data: [] }
    }
    const includedUuid = { id: uuidv4(), ...body }
    sharedUsers.push(includedUuid)
    return { success: true, message: 'Registro criado com sucesso', data: includedUuid }
})