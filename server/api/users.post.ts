import { v4 as uuidv4 } from "uuid"
import { User } from "~/types/User"
import sharedUsers from "./data"
export default defineEventHandler(async (event) => {
    const body: User = await readBody(event)
    const verifyValues = Object.values(body).every(item => item !== "")

    if (!verifyValues) {
        setResponseStatus(event, 400)
        return { sucesso: false, data: [] }
    }
        
    const verifyIfNotExist = sharedUsers.filter(user => user.cpf === body.cpf || user.email === body.email)
    if (verifyIfNotExist.length > 0) { // Se entrar aqui, quer dizer que existe
        return { sucesso: false, data: [] }
    }
    const includedUuid = { id: uuidv4(), ...body }
    sharedUsers.push(includedUuid)
    return { sucesso: true, data: includedUuid }
})