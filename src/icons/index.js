import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// 下面两行代码的含义：将svg目录下所有.svg后缀的文件全部引入到项目中
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)