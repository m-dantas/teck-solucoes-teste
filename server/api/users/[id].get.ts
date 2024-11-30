import sharedUsers from "../data"
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const data = sharedUsers.find(user => user.id === id)
  if (data) {
    return { success: true, message: 'OK', data: { ...data } }
  }
  setResponseStatus(event, 404)
  return { success: false, message: 'Usuário não encontrado', data: {}}
})
