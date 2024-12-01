import sharedUsers from "../data"
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const index = sharedUsers.findIndex(user => user.id === id)
  if (index !== -1) {    
    sharedUsers[index] = { id, ...body }
    return { success: true, message: 'Usuário atualizado com sucesso', data: sharedUsers[index] }
  }
  setResponseStatus(event, 404)
  return { success: false, message: 'Usuário não encontrado', data: {}}
})
