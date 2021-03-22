<template>
    <div class="theInput">
        <Card>
            <Form :label-width="160">
                <Checkbox v-model="ui.showConfig" @click="ui.showConfig=!ui.showConfig">显示配置</Checkbox>
                <Checkbox v-model="ui.showModule" @click="ui.showModule=!ui.showModule">显示组件</Checkbox>
                <Checkbox v-model="ui.showCode" @click="ui.showCode=!ui.showCode">显示代码</Checkbox>
                <div class="show" v-show="ui.showConfig">
                    <FormItem label="最大输入长度">
                        <InputNumber
                            placeholder="输入最大输入长度"
                            style="width: 300px"
                            v-model="config.max"
                        ></InputNumber>
                    </FormItem>
                </div>
            </Form>
            <div class="bottom" v-show="ui.showModule">
                <InputNumberModule></InputNumberModule>
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
        strCopyDetele() {
            return `
            <label>{{${this.x_prefix.detail}${this.model.key}}}</label>
             `
        },
        strCopyAdd() {
            let e = this.config;
            return `
            <InputNumber
            :max="${e.max}"
            :min="0"
            placeholder="请输入${this.model.title}"
            class="modal-width"
            v-model="${this.x_prefix.add}${this.model.key}"
            ></InputNumber>
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
                max: 999
            },
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
                        detail: this.strCopyDetele
                    },
                    script: {
                        data: {
                            ui: {
                                dics: null,
                            },
                            columns: `{title: "${this.model.title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${this.model.key}) },`
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
            let e = this.config;
            this.str =
                `
            <InputNumber
                :max="${e.max}"
                :min="0"
                placeholder="请输入${this.model.title}"
                style="width: 300px" 
            ></InputNumber>
                `;
            this.setModel();
            modulesJS.modules("InputNumberModule", Vue, this.str)
        }
    },
    mounted() {
        this.setModel();
    },
    created() {
        let e = this.config;
        this.str =
            `
            <InputNumber
                :max="${e.max}"
                :min="0"
                placeholder="请输入${this.model.title}"
                style="width: 300px" 
            ></InputNumber>
                `;
        modulesJS.modules("InputNumberModule", Vue, this.str)
    }
}
</script>
<style lang="less" scoped>
.bottom {
    margin-top: 20px;
}
</style>