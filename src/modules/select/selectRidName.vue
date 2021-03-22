<template>
    <div class="theInput">
        <Card>
            <Form :label-width="160">
                <Checkbox v-model="ui.showConfig" @click="ui.showConfig=!ui.showConfig">显示配置</Checkbox>
                <Checkbox v-model="ui.showModule" @click="ui.showModule=!ui.showModule">显示组件</Checkbox>
                <Checkbox v-model="ui.showCode" @click="ui.showCode=!ui.showCode">显示代码</Checkbox>
                <div class="show" v-show="ui.showConfig">
                    <FormItem label="占位文本">
                        <Input
                            v-model="config.placeholder"
                            placeholder="输入占位文本"
                            :disabled="true"
                            style="width: 300px"
                        />
                    </FormItem>
                    <FormItem label="是否禁用">
                        <i-switch v-model="config.disabled" />
                    </FormItem>
                    <FormItem label="是否支持多选">
                        <i-switch v-model="config.multiple" />
                    </FormItem>
                </div>
            </Form>
            <div class="bottom" v-show="ui.showModule">
                <selectRidNameModule></selectRidNameModule>
            </div>
            <div v-show="ui.showCode">
                <pre v-highlightjs="strCopyAdd"><code class="javascript"></code></pre>
            </div>
        </Card>
    </div>
</template>
<script>
import Vue from 'vue'
import modulesJS from '.././js/modules'
export default {
    props: {
        obj: {
            type: Object
        }
    },
    computed: {
        model: {
            get: function () {
                return this.obj
            },
            set: function (obj) {
                return this.$emit("input", obj);
            }
        },
        strCopyDetail() {
            return `
            <label>{{${this.x_prefix.detail}${this.model.key}?${this.x_prefix.detail}${this.model.key}.name:null}}</label>
             `
        },
        strCopyAdd() {
            let e = this.config;
            return `
            <Select 
             v-model="${this.x_prefix.add}${this.model.key}"
             placeholder="${e.placeholder}${this.model.title}"  ${e.disabled ? ':disabled="true"' : ""}  ${e.multiple ? ':multiple="true"' : ""} 
             class="modal-width"
             clearable
             >
                <Option
                    v-for="(item,index) in ui.dics.${this.model.firstUpeer}"
                    :value="item"
                    :key="index"
                >{{item.name}}</Option>
             </Select>
             `
        },
        x_prefix() {
            return this.$store.state.prefix;
        },
    },
    data() {
        return {
            str: null,
            ui: {
                showConfig: false,
                showModule: false,
                showCode: false,
            },
            config: {
                placeholder: "请选择",
                disabled: false,
                multiple: false
            },
            attribute: {
            },
            text: {
                list: [
                    {
                        value: "模拟数据",
                        label: 1
                    },
                    {
                        value: "模拟数据",
                        label: 2
                    },
                ],
                model: null
            }
        }
    },
    watch: {
        config: {
            deep: true,
            handler() {
                this.setStr();
            }
        }
    },
    methods: {
        setModel() {
            this.model.module = {
                objText: this.model.key,
                count: this.model.count,
                modules: {
                    template: {
                        ConventionalLayout: {
                            search: null,
                            tools: null,
                        },
                        add: this.strCopyAdd,
                        detail: this.strCopyDetail
                    },
                    script: {
                        data: {
                            ui: {
                                dics: this.model.firstUpeer,
                            },
                            columns: `{title: "${this.model.title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${this.model.key}?p.row.${this.model.key}.name:null) },`
                        },
                        created: {
                            beforeShow: null,
                            beforeEditShow: `if (obj.${this.model.key}) obj.${this.model.key} = this.ui.dics.${this.model.firstUpeer}.find(x => x.rid == obj.${this.model.key}.rid);`
                        }
                    }
                },
                main: {
                    html: {

                    },
                    js: {

                    }
                }
            }
        },
        setStr() {
            let e = this.config;
            this.str =
                `<Select
                style="width: 300px"
                clearable
                ${e.disabled ? ':disabled="true"' : ""}
                ${e.multiple ? ':multiple="true"' : ""} 
                >
                   <Option value="1">1</Option>
                   <Option value="2">2</Option>
            </Select>`;
            this.setModel();
            modulesJS.modules("selectRidNameModule", Vue, this.str)
        }
    },
    mounted() {
        this.setModel();
    },
    created() {
        let e = this.config;
        this.str =
            `<Select
                style="width: 300px"
                clearable
                ${e.disabled ? ':disabled="true"' : ""}
                ${e.multiple ? ':multiple="true"' : ""} 
                >
                   <Option value="1">1</Option>
                   <Option value="2">2</Option>
            </Select>`;
        modulesJS.modules("selectRidNameModule", Vue, this.str)
    }
}
</script>
<style lang="less" scoped>
.bottom {
    margin-top: 20px;
}
</style>