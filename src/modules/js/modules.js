export default {
    modules(moduleName, frame, str) {
        if (!frame) {
            console.error("需指定页面对象参数,在vue页面中为Vue")
            return;
        }
        let comlieStr = frame.compile(str);
        frame.component(moduleName, {
            render: comlieStr.render
        })
        return comlieStr
    }
}