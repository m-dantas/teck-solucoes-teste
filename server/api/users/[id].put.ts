import sharedUsers from "../data"
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const index = sharedUsers.findIndex(user => user.id === id)
  sharedUsers[index] = { id, ...body }
  return { success: true, message: 'Usuário atualizado com sucesso', data: sharedUsers[index] }
})
