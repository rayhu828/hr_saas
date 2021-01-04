import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
service.interceptors.request.use()
service.interceptors.response.use(response => {
    // 成功情况
    const { success, message, data } = response.data
    if(success) {
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    Message.error(error.message)
    // 失败情况
    return Promise.reject(error)
})
export default service