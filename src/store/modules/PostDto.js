const page = {
    state: {
        PostDto: [],
        PostDtoCopy: []
    },
    mutations: {
        setPostDto(state, page) {
            state.PostDto = [];
            let count = {
                object: 0,
                number: 0,
                string: 0,
                date: 0,
                boolean: 0,
            };
            for (var name in page) {
                let type = null;
                if (typeof page[name] == "object") {
                    count.object = count.object + 1;
                    type = "object";
                }
                if (typeof page[name] == "number") {
                    count.number = count.number + 1;
                    type = "number";
                }
                if (typeof page[name] == "string") {
                    if (page[name].length < 20) {
                        count.string = count.string + 1;
                        type = "string";
                    } else {
                        count.date = count.date + 1;
                        type = "date"
                    }
                }
                if (typeof page[name] == "boolean") {
                    count.boolean = count.boolean + 1;
                    type = "boolean";
                }

                state.PostDto.push({
                    key: name,
                    title: null,
                    firstUpeer: toFirstUpeer(name),
                    required: false,
                    type: type,
                    moduleName: null,
                    module: null,
                    value: JSON.stringify(page[name]),
                    show: true
                })
            }
            state.PostDto.forEach(x => {
                if (x.type == "object") x.count = count.object
                if (x.type == "number") x.count = count.number
                if (x.type == "string") x.count = count.string
                if (x.type == "date") x.count = count.date
                if (x.type == "boolean") x.count = count.boolean
            });
        },
        setEqual(state, page) {
            state.PostDto = page;
        },
        setEqualCopy(state, page) {
            state.PostDtoCopy = page;
        }
    }
};

function toFirstUpeer(keyName) {
    if (keyName.includes('_')) {
        let keyNameCopy = keyName.split("_").reverse();
        keyName = keyNameCopy[0];
    }
    let firstStr = keyName.charAt(0).toUpperCase();
    return firstStr + keyName.slice(1);
}
export default page;