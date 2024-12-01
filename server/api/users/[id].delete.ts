import sharedUsers from "../data"
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const index = sharedUsers.findIndex(user => user.id === id)
  if (index !== -1) {
    sharedUsers.splice(index, 1)
    return { success: false, message: 'Usuário removido', data: {}}
  }
  setResponseStatus(event, 404)
  return { success: false, message: 'Usuário não encontrado', data: {}}
})
