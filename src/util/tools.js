function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    // console.log(o)
    for (var key in o) {
        if (o[key] === null) {
            delete o[key];
            continue;
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim();
            if (o[key] === '') {
                delete o[key];
                continue;
            }
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key]);
            if (JSON.stringify(o[key]) == '{}') {
                delete o[key];
            }
            continue;
        } else if (toType(o[key]) === 'array') {
            if (o[key].length == 0) {
                delete o[key];
                continue;
            }
            o[key] = filterNull(o[key]);
            continue;
        }
    }
    return o;
}
// 深度合并
function deepMerge(obj1, obj2) {
    let key;
    for (key in obj2) {
        obj1[key] =
            obj1[key] &&
            obj1[key].toString() === "[object Object]" &&
            (obj2[key] && obj2[key].toString() === "[object Object]") ?
            deepMerge(obj1[key], obj2[key]) :
            (obj1[key] = obj2[key]);
    }
    return obj1;
}
export default {
    assign(CopyObj, obj) {
        // obj = filterNull(obj);
        return deepMerge(JSON.parse(JSON.stringify(CopyObj)), obj)
    }
}