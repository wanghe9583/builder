<template>
    <div class="theInput">
        <Card>
            <Form :label-width="160">
                <Checkbox v-model="ui.showConfig" @click="ui.showConfig=!ui.showConfig">显示配置</Checkbox>
                <Checkbox v-model="ui.showModule" @click="ui.showModule=!ui.showModule">显示组件</Checkbox>
                <Checkbox v-model="ui.showCode" @click="ui.showCode=!ui.showCode">显示代码</Checkbox>
                <div class="show" v-show="ui.showConfig">
                    <FormItem label="输入框类型">
                        <RadioGroup v-model="config.type">
                            <Radio :label="item" v-for="item in attribute.types" :key="item">
                                <span>{{item}}</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="最大输入长度">
                        <Slider style="width: 500px;margin-left: 160px;" v-model="config.maxlength"></Slider>
                    </FormItem>
                    <FormItem label="设置输入框为禁用状态">
                        <i-switch v-model="config.disabled" />
                    </FormItem>
                    <FormItem label="设置输入框为只读">
                        <i-switch v-model="config.readonly" />
                    </FormItem>
                    <FormItem label="自动获取焦点">
                        <i-switch v-model="config.autofocus" />
                    </FormItem>
                </div>
            </Form>
            <div class="bottom" v-show="ui.showModule">
                <inputStringModule></inputStringModule>
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
            <Input type="${e.type}" ${e.type == "textarea" ? ':autosize="{minRows: 2,maxRows: 5}"' : ""}
            placeholder="${e.placeholder}${this.model.title}" 
            :maxlength="${e.maxlength}"
            v-model="${this.x_prefix.add}${this.model.key}" ${e.disabled ? ':disabled="true"' : ""} ${e.readonly ? ':readonly="true"' : ""} ${e.autofocus ? ':autofocus="true"' : ""} 
            clearable
            class="modal-width" />
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
                type: "text",
                placeholder: "请输入",
                disabled: false,
                readonly: false,
                maxlength: 50,
                autofocus: false,
                autosize: "{minRows: 2,maxRows: 5}"
            },
            attribute: {
                types: ["text", "password", "textarea", "url", "email", "date", "number", "tel"],
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
                <Input type="${e.type}" 
                 placeholder="${e.placeholder}${this.model.title}" 
                ${e.disabled ? ':disabled="true"' : ""}
                ${e.readonly ? ':readonly="true"' : ""} 
                :maxlength="${e.maxlength}"
                ${e.autofocus ? ':autofocus="true"' : ""} 
                clearable
                style="width: 300px" />
                `;
            this.setModel();
            modulesJS.modules("inputStringModule", Vue, this.str)
        }
    },
    mounted() {
        this.setModel();
    },
    created() {
        let e = this.config;
        this.str =
            `
                <Input type="${e.type}" 
                 placeholder="${e.placeholder}${this.model.title}" 
                ${e.disabled ? ':disabled="true"' : ""}
                ${e.readonly ? ':readonly="true"' : ""} 
                :maxlength="${e.maxlength}"
                ${e.autofocus ? ':autofocus="true"' : ""} 
                clearable
                style="width: 300px" />
                `;
        modulesJS.modules("inputStringModule", Vue, this.str)
    }
}
</script>
<style lang="less" scoped>
.bottom {
    margin-top: 20px;
}
</style>