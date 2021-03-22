<template>
    <div class="main">
        <div class="left">
            <Input
                v-model="valueK"
                class="textarea"
                @on-change="inputOnChangeK"
                type="textarea"
                :rows="16"
            />
            <Input
                v-model="valueV"
                class="textarea"
                @on-change="inputOnChangeV"
                type="textarea"
                :rows="16"
            />
            <div class="buttom">
                <Button @click="save()" type="primary">确定</Button>
            </div>
        </div>
        <div class="centre">
            <div class="top">
                <RadioGroup v-model="msg" @on-change="v=>fileter(v)">
                    <Radio label="success"></Radio>
                    <Radio label="error"></Radio>
                    <Radio label="warning"></Radio>
                </RadioGroup>
            </div>
            <div class="list" v-if="verifyArray.length">
                <Card class="item" v-for="(item,index) in verifyArray" :key="index">
                    <p slot="title">{{item.keyK?item.keyK:item.keyV}}</p>
                    <p slot="extra">{{item.msg}}</p>
                    <pre v-highlightjs="JSON.stringify(item.valueK)"><code class="javascript"></code></pre>
                    <pre v-highlightjs="JSON.stringify(item.valueV)"><code class="javascript"></code></pre>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            valueK: "",
            valueV: "",
            objK: null,
            objV: null,
            verifyArray: [],
            verifyArrayCopy: [],
            msg: "error"
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        save() {
            this.verifyArray = this.objVerify(this.objK, this.objV);
            this.verifyArrayCopy = this.verifyArray;
            this.fileter("error");
        },
        fileter(name) {
            this.verifyArray = this.verifyArrayCopy.filter(x => x.msg == name)
        },
        objVerify(objK, objV) {
            let list = [];
            for (let key in objK) {
                let item = {};
                for (let key2 in objV) {
                    if (key == key2) {
                        if (typeof objK[key] == "object" && typeof objV[key2] == "object") {
                            let bool = this.isObjectValueEqual(objK[key], objV[key2]);
                            if (bool) {
                                item = {
                                    keyK: key,
                                    keyV: key2,
                                    valueK: objK[key],
                                    valueV: objV[key2],
                                    msg: "success"
                                }
                            } else {
                                item = {
                                    keyK: key,
                                    keyV: key2,
                                    valueK: objK[key],
                                    valueV: objV[key2],
                                    msg: "error"
                                }
                            }
                        } else if (objK[key] == objV[key2]) {
                            item = {
                                keyK: key,
                                keyV: key2,
                                valueK: objK[key],
                                valueV: objV[key2],
                                msg: "success"
                            }
                        } else {
                            item = {
                                keyK: key,
                                keyV: key2,
                                valueK: objK[key],
                                valueV: objV[key2],
                                msg: "error"
                            }
                        }
                    }
                }
                if (JSON.stringify(item) == "{}") {
                    item = {
                        keyK: key,
                        msg: "warning"
                    }
                }
                list.push(item)
            }
            return list
        },
        isObjectValueEqual(objK, objV) {
            let statu = true;
            for (let keyK in objK) {
                for (let keyV in objV) {
                    if (typeof objK[keyK] == "object" && typeof objV[keyV] == "object") {
                        this.isObjectValueEqual(objK[keyK], objV[keyV]);
                    } else if (keyK == keyV && objK[keyK] == objV[keyV]) {
                        statu = true;
                    } else {
                        statu = false
                    }
                }
            }
            return statu
        },
        inputOnChangeK() {
            this.objK = this.shiftObjName(JSON.parse(this.valueK));
        },
        inputOnChangeV() {
            this.objV = this.shiftObjName(JSON.parse(this.valueV));
        },
        shiftObjName(str) {
            for (var name in str) {
                if (typeof str[name] == "object") {
                    if (Array.isArray(str[name]) == true) {
                        str[name] = "Array";
                    } else {
                        this.shiftObjName(str[name])
                    }
                } else if (typeof str[name] == "string") {
                    if (parseInt(str[name]).toString() == "NaN") {
                        str[name] = "String";
                    } else {
                        if (str[name].includes("-") == true) {
                            str[name] = "Date";
                        } else {
                            str[name] = "String";
                        }
                    }
                }
                else if (typeof str[name] == "number") {
                    str[name] = "Number";
                } else if (typeof str[name] == "boolean") {
                    str[name] = "Boolean";
                }
            }
            return str
        },

    },
    mounted() {
        var a = {
            name: "String",
            rid: "String"
        };
        var b = {
            name: "String",
            rid: "String"
        }
        console.log(this.isObjectValueEqual(a, b));
    }
}
</script>
<style scoped lang="less">
.main {
    display: flex;
    .left {
        margin-left: 20px;
        width: 400px;
        display: flex;
        flex-direction: column;
        .textarea {
            margin-top: 15px;
            margin-bottom: 20px;
        }
        .buttom {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
    }
    .centre {
        margin-left: 20px;
        max-height: 900px;
        overflow: auto;
        width: 1600px;
        .top {
            display: flex;
            justify-content: flex-end;
            margin: 34px;
        }
        .list {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 350px;
                margin: 0 20px 20px 0;
            }
        }
    }
}
.margin-right {
    margin-right: 10px;
}
</style>
