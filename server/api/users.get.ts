import sharedUsers from "./data"
export default defineEventHandler(async (event) => {
    return { sucesso: true, data: sharedUsers }
})