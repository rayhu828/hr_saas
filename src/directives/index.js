export const imageerror = {
    // inserted函数会在该自定义指令所作用的dom元素，插入到节点之后执行
    inserted(dom, options) {
        dom.onerror = function() {
            dom.src = options.value
        }
    }
}