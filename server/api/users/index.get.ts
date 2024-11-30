import sharedUsers from "../data"
export default defineEventHandler(async (event) => {
    return { success: true, message: 'OK', data: sharedUsers }
})