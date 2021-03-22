<template>
    <div class="theInput">
        <Card>
            <Form :label-width="160">
                <Checkbox v-model="ui.showConfig" @click="ui.showConfig=!ui.showConfig">显示配置</Checkbox>
                <Checkbox v-model="ui.showModule" @click="ui.showModule=!ui.showModule">显示组件</Checkbox>
                <Checkbox v-model="ui.showCode" @click="ui.showCode=!ui.showCode">显示代码</Checkbox>
                <div class="show" v-show="ui.showConfig"></div>
            </Form>
            <div class="bottom" v-show="ui.showModule">
                <datePickerDateModule></datePickerDateModule>
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
            <label>{{${this.x_prefix.detail}${this.model.key}?${this.x_prefix.detail}${this.model.key}.substring(0,10):null}}</label>
             `
        },
        strCopyAdd() {
            return `
            <DatePicker
            type="date"
            clearable
            class="modal-width"
            placeholder="请选择${this.model.title}"
            v-model="${this.x_prefix.add}${this.model.key}"
            ></DatePicker> 
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
                                dics: null,
                            },
                            columns: `{title: "${this.model.title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${this.model.key}?p.row.${this.model.key}.substring(0,10):null) },`
                        },
                        created: {
                            beforeShow: null,
                            beforeEditShow: null
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
            this.str =
                `
            <DatePicker
            type="date"
            clearable
            style="width: 300px"
            placeholder="请选择${this.model.title}"
            ></DatePicker>`;
            this.setModel();
            modulesJS.modules("datePickerDateModule", Vue, this.str)
        }
    },
    mounted() {
        this.setModel();
    },
    created() {
        this.str =
            `
            <DatePicker
            type="date"
            clearable
            style="width: 300px"
            placeholder="请选择${this.model.title}"
            ></DatePicker>`;
        modulesJS.modules("datePickerDateModule", Vue, this.str)
    }
}
</script>
<style lang="less" scoped>
.bottom {
    margin-top: 20px;
}
</style>