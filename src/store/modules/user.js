import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
    token: getToken(),
    userInfo: {}
}
const mutations = {
    setToken(state, token) {
        state.token = token;
        setToken(token)
    },
    removeToken(state) {
        state.token = null,
        removeToken()
    },
    setUserInfo(state, userInfo) {
        // 这样是响应式
        state.userInfo = userInfo
        // 浅拷贝的方式也可以
        // state.userInfo = { ...userInfo }
    },
    reomveUserInfo(state) {
        state.userInfo = {}
    }
}
const actions = {
    async login(context, data) {
        const result = await login(data)
        context.commit('setToken', result)
    },
    async getUserInfo(context) {
        const result = await getUserInfo()
        const baseInfo = await getUserDetailById(result.userId)
        const baseResult = { ...result, ...baseInfo }
        context.commit('setUserInfo', baseResult)
        return baseResult
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}