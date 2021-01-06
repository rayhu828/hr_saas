import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
// 超时时间单位是秒
const TimeOut = 3600
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
service.interceptors.request.use(config => {
    if(store.getters.token) {
        if(IsCheckTimeOut()) {
            store.dispatch('user/logout')
            router.push('/login')
            return Promise.reject(new Error('token超时了'))
        }
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(response => {
    // 成功情况
    const { success, message, data } = response.data
    if(success) {
        return Promise.resolve(data)
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    // 失败情况
    if(error.response && error.response.data && error.response.data.code === 10002) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
    } else {
        Message.error(error.message)
        return Promise.reject(error)
    }
})
function IsCheckTimeOut() {
    var currentTime = Date.now()
    var timeStamp = getTimeStamp()
    return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service