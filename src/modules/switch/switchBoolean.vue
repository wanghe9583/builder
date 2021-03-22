<template>
    <div class="theInput">
        <Card>
            <Form :label-width="160">
                <Checkbox v-model="ui.showConfig" @click="ui.showConfig=!ui.showConfig">显示配置</Checkbox>
                <Checkbox v-model="ui.showModule" @click="ui.showModule=!ui.showModule">显示组件</Checkbox>
                <Checkbox v-model="ui.showCode" @click="ui.showCode=!ui.showCode">显示代码</Checkbox>
                <div class="show" v-show="ui.showConfig">
                    <FormItem label="open 字段">
                        <Input v-model="config.open" placeholder="输入open" style="width:400px" />
                    </FormItem>
                    <FormItem label="close 字段">
                        <Input v-model="config.close" placeholder="输入close" style="width:400px" />
                    </FormItem>
                </div>
            </Form>
            <div class="bottom" v-show="ui.showModule">
                <switchBooleanModule></switchBooleanModule>
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
            <label>{{${this.x_prefix.detail}${this.model.key}?"${this.config.open}":"${this.config.close}"}}</label> 
            `
        },
        strCopyAdd() {
            return `
            <Switch v-model="${this.x_prefix.detail}${this.model.key}">
              <span slot="open">${this.config.open}</span>
              <span slot="close">${this.config.close}</span>
            </Switch>`
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
                open: "是",
                close: "否"
            },
            attribute: {
            },
            text: {

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
                            columns: `{title: "${this.model.title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${this.model.key}?"${this.config.open}":"${this.config.close}") },`
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
            <Switch>
              <span slot="open">${this.config.open}</span>
              <span slot="close">${this.config.close}</span>
            </Switch>
            `;
            this.setModel();
            modulesJS.modules("switchBooleanModule", Vue, this.str)
        }
    },
    mounted() {
        this.setModel();
    },
    created() {
        this.str = ` 
            <Switch>
              <span slot="open">${this.config.open}</span>
              <span slot="close">${this.config.close}</span>
            </Switch>
        `;
        modulesJS.modules("switchBooleanModule", Vue, this.str)
    }
}
</script>
<style lang="less" scoped>
.bottom {
    margin-top: 20px;
}
</style>