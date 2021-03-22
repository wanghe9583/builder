<template>
    <div class="app">
        <div class="block">
            <div class="block1">
                <Input
                    v-model="obj"
                    type="textarea"
                    @on-change="onChange"
                    :rows="4"
                    placeholder="page"
                />
                <Input
                    v-model="objAdd"
                    type="textarea"
                    @on-change="onChangeAdd"
                    :rows="4"
                    placeholder="add"
                />
                <Input v-model="apiSrc" placeholder="api" />
            </div>
            <!-- <theTemplate2></theTemplate2> -->
            <div class="block2" v-if="objAdd&&tab==1">
                <List border>
                    <ListItem v-for="(value, key, index) in objAdd" :key="index">
                        <Button
                            v-if="typeof value=='object'"
                            type="primary"
                            @click="objSplit(key)"
                        >拆分</Button>
                        <Button type="primary" @click="objDelete(key)">删除</Button>
                        <Tabs value="name1">
                            <TabPane :label="key" name="name1">
                                <div v-if="typeof value=='object'">
                                    <div
                                        v-for="(value2, key, index) in value"
                                        :key="index"
                                    >{{key}}:{{ value2 }}</div>
                                </div>
                                <div v-else>{{ value }}</div>
                            </TabPane>
                        </Tabs>
                    </ListItem>
                </List>
                <Button type="primary" @click="next()">下一步</Button>
            </div>
            <div class="block2" v-if="tab==2">
                <Card>
                    <Card
                        padding="10"
                        style="margin:10px 0"
                        v-for="(item,index) in objNext"
                        :key="index"
                    >
                        <Row>
                            <i-col span="24">key:{{item.key}}</i-col>
                            <i-col span="24">
                                标题
                                <Input v-model="item.title" style="width: 300px" />
                            </i-col>
                            <i-col span="24">
                                <Checkbox v-model="item.required">必填项</Checkbox>
                            </i-col>
                            <i-col span="24">
                                <Checkbox v-model="item.show">显示</Checkbox>
                            </i-col>
                            <i-col span="24">类型:{{item.type}}</i-col>
                            <i-col span="24">value:{{item.value}}</i-col>
                        </Row>
                    </Card>
                    <Button type="primary" @click="save()">提交</Button>
                </Card>
            </div>
            <div class="block3">
                <Card>
                    <theTemplate>
                        <div slot="search">
                            <label
                                v-for="(item,index) in search"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                        <div slot="modalAdd">
                            <label
                                v-for="(item,index) in modalAdd"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                        <div slot="modalDetail">
                            <label
                                v-for="(item,index) in modalDetail"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                    </theTemplate>
                    <theScript>
                        <div slot="import"></div>
                        <div slot="components">
                            <label
                                v-for="(item,index) in scriptSetting.components"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                        <div slot="data">
                            <label
                                v-for="(item,index) in scriptSetting.data"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                        <div slot="methods">
                            <label
                                v-for="(item,index) in scriptSetting.methods"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                        <div slot="mounted">
                            <label
                                v-for="(item,index) in scriptSetting.mounted"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                        <div slot="created">
                            <label
                                v-for="(item,index) in scriptSetting.created"
                                :key="index"
                                v-text="item"
                            >{{item}}</label>
                        </div>
                    </theScript>
                    <span v-text="text"></span>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
import theTemplate from '@/components/theTemplate'
import theTemplate2 from '@/components/theTemplate2'
import theScript from '@/components/theScript'
export default {
    components: { theTemplate, theScript, theTemplate2 },
    data() {
        return {
            obj: null,
            objAdd: null,
            objAddCopy: null,
            search: [],
            tab: 1,
            objNext: null,
            modalAdd: [],
            modalDetail: [],
            scriptSetting: {
                components: [],
                data: [],
                methods: [],
                mounted: [],
                created: []
            },
            apiSrc: null,
            text: ` <style lang="less" scoped>
@import '~@/assets/css/modal-width.less';
</style>`
        }
    },

    methods: {
        objDelete(key) {
            this.objAdd[key] = undefined;
            delete this.objAdd[key]
        },
        objSplit(key) {
            for (var name in this.objAdd) {
                if (key == name) {
                    for (var name2 in this.objAdd[name]) {
                        let key2 = `(${name})_(${name2})`
                        this.objAdd[key2] = this.objAdd[name][name2]
                    }
                    this.objAdd[name] = undefined;
                    delete this.objAdd[name]
                }
            }
        },
        onChange() {
            let obj = JSON.parse(this.obj)
            delete obj.pageIndex
            delete obj.pageSize
            for (var name in obj) {
                if (typeof obj[name] == "string") {
                    let str = `<Input placeholder="输入关键字" class="input" clearable v-model="page.${name}" />`;
                    this.search.push(str)
                }
                if (typeof obj[name] == "object") {
                    var bs = name.charAt(0);
                    var cs = bs.toUpperCase();
                    var name1 = cs + name.slice(1);
                    let str = ` <Select class="select" v-model="page.${name}" clearable placeholder="提示${name}">
                    <Option
                        v-for="(item,index) in ui.dics.${name1}"
                        :value="item"
                        :key="index"
                    >{{ item.v }}</Option>
                </Select>`;
                    this.search.push(str)
                }
                if (typeof obj[name] == "boolean") {
                    let str = ` <Select class="select" v-model="page.${name}" placeholder="提示${name}" clearable>
                   <Option value="true">true</Option>
                    <Option value="false">false</Option>
                </Select>`;
                    this.search.push(str)
                }
            }
        },
        onChangeAdd() {
            let obj = JSON.parse(this.objAdd);
            let obj1 = JSON.parse(this.objAdd);
            this.objAdd = obj;
            this.objAddCopy = obj1;
            delete obj1.msg
            delete obj1.status
            delete obj.msg
            delete obj.status
        },
        next() {
            this.scriptSetting.created.push(`this.page = this.$api.createPage("/${this.apiSrc}/Page");`);
            this.scriptSetting.created.push(`this.target = this.$api.createCommonLogicObj('/${this.apiSrc}',  ${JSON.stringify(this.objManage(this.objAddCopy)).replace(/"/g, "")});`);
            let objNext = JSON.parse(JSON.stringify(this.objAdd));
            let names = [];
            for (var name in objNext) {
                if (typeof objNext[name] == "object") {
                    let obj = {};
                    obj = {
                        key: name,
                        required: false,
                        title: null,
                        type: typeof objNext[name],
                        modules: null,
                        value: objNext[name],
                        show: true
                    }
                    names.push(obj)
                }
                if (typeof objNext[name] == "number") {
                    let obj = {};
                    obj = {
                        key: name,
                        title: null,
                        required: false,
                        type: typeof objNext[name],
                        modules: null,
                        value: objNext[name],
                        show: true
                    }
                    names.push(obj)
                }
                if (typeof objNext[name] == "string") {
                    if (objNext[name].length < 20) {
                        let obj = {};
                        obj = {
                            key: name,
                            title: null,
                            required: false,
                            type: typeof objNext[name],
                            modules: null,
                            value: objNext[name],
                            show: true

                        }
                        names.push(obj)
                    } else {
                        let obj = {};
                        obj = {
                            key: name,
                            title: null,
                            required: false,
                            type: "date",
                            modules: null,
                            value: objNext[name],
                            show: true

                        }
                        names.push(obj)
                    }
                    console.log()


                }
                if (typeof objNext[name] == "boolean") {
                    let obj = {};
                    obj = {
                        key: name,
                        title: null,
                        required: false,
                        type: typeof objNext[name],
                        modules: null,
                        value: objNext[name],
                        show: true
                    }
                    names.push(obj)
                }
            }
            this.objNext = names;
            this.tab = 2;
        },
        save() {
            let objNext1 = JSON.parse(JSON.stringify(this.objNext));
            let objNext2 = JSON.parse(JSON.stringify(this.objNext));
            let objNext3 = JSON.parse(JSON.stringify(this.objNext));
            objNext1.forEach(x => {
                let required = x.required ? '<font class="font-red">*</font>' : ""
                if (x.type == 'object') {
                    let str = "";
                    if (x.value.v && x.value.k) {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                            <Select
                                                transfer
                                                clearable
                                                class="modal-width"
                                                 placeholder="请选择${x.title}"
                                                v-model="target.add.obj.${x.key[0]}"
                                            >
                                                <Option
                                                    v-for="(item,index) in ui.dics.${x.key[1]}"
                                                    :value="item"
                                                    :key="index"
                                                >{{item.v}}</Option>
                                            </Select>
                                        </FormItem>${required}`

                    } else if (x.value.rid && x.value.name) {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                            <Select
                                                transfer
                                                clearable
                                                class="modal-width"
                                                 placeholder="请选择${x.title}"
                                                v-model="target.add.obj.${x.key[0]}"
                                            >
                                                <Option
                                                    v-for="(item,index) in ui.dics.${x.key[1]}"
                                                    :value="item"
                                                    :key="index"
                                                >{{item.name}}</Option>
                                            </Select>
                                        </FormItem>${required}`

                    }
                    else if (x.value.names && x.value.codes) {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = ` <FormItem label="${x.title}">
                                            <Cascader
                                                transfer
                                                class="modal-width"
                                                clearable
                                                 placeholder="请选择${x.title}"
                                                :load-data="regionsLoad"
                                                :data="ui.regions"
                                                v-model="target.add.obj.${x.key[0]}.codes"
                                            ></Cascader>
                                        </FormItem>${required}`
                    } else {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = ` <FormItem label="${x.title}">
                                           **没处理的对象** {{${x.title}}}{{${x.key[0]}}}
                                        </FormItem>${required}`
                    }
                    this.modalAdd.push(str);
                }
                if (x.type == "string") {
                    x.title = x.title ? x.title : x.key
                    x.key = this.utilKey(x.key);
                    let str = `<FormItem label="${x.title}">
                                            <Input
                                                class="modal-width"
                                                v-model="target.add.obj.${x.key[0]}"
                                                placeholder="请输入${x.title}"
                                                clearable
                                                :maxlength="50"
                                            />
                                            ${required}
                                        </FormItem>`;
                    this.modalAdd.push(str);
                }
                if (x.type == "date") {
                    x.title = x.title ? x.title : x.key
                    x.key = this.utilKey(x.key);
                    let str = `<FormItem label="${x.title}">
                                        <DatePicker
                                            type="date"
                                            class="modal-width"
                                            v-model="target.add.obj.${x.key[0]}"
                                        />
                                        ${required}
                                    </FormItem>`;
                    this.modalAdd.push(str);
                }
                if (x.type == "number") {
                    x.title = x.title ? x.title : x.key
                    x.key = this.utilKey(x.key);
                    let str = `<FormItem label="${x.title}">
                                <InputNumber
                                    :max="990"
                                    :min="0"
                                    placeholder="请输入${x.title}"
                                    class="modal-width"
                                    v-model="target.add.obj.${x.key[0]}"
                                ></InputNumber>
                                ${required}
                            </FormItem>`;
                    this.modalAdd.push(str);
                }
                if (x.type == "boolean") {
                    x.title = x.title ? x.title : x.key
                    x.key = this.utilKey(x.key);
                    let str = `<FormItem label="${x.title}">
                                <i-switch v-model="target.add.obj.${x.key[0]}" />
                                ${required}
                            </FormItem>`;
                    this.modalAdd.push(str);
                }
            });
            objNext2.forEach(x => {
                let str = "";
                if (x.type == 'object') {
                    if (x.value.v && x.value.k) {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                <label>{{target.detail.obj.${x.key[0]}?target.detail.obj.${x.key[0]}.v:null}}</label>
                            </FormItem>`
                    }
                    else if (x.value.rid && x.value.name) {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                <label>{{target.detail.obj.${x.key[0]}?target.detail.obj.${x.key[0]}.name:null}}</label>
                            </FormItem>`
                    } else if (x.value.names && x.value.codes) {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                <label>{{target.detail.obj.${x.key[0]}?target.detail.obj.${x.key[0]}.text:null}}</label>
                            </FormItem>`
                    }
                    else {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                <label>**没处理的对象**{{target.detail.obj.${x.key[0]}}}</label>
                            </FormItem>`
                    }
                } else {
                    if (x.type == "date") {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                <label>{{target.detail.obj.${x.key[0]}?target.detail.obj.${x.key[0]}.substring(0, 10):null}}</label>
                            </FormItem>`
                    } else {
                        x.title = x.title ? x.title : x.key
                        x.key = this.utilKey(x.key);
                        str = `<FormItem label="${x.title}">
                                <label>{{target.detail.obj.${x.key[0]}}}</label>
                            </FormItem>`
                    }

                }
                this.modalDetail.push(str)
            })
            let conut = 0;
            let sl = "";
            let sl2 = "";
            let beforeEditShow = ""
            let columns = "";
            let condition = "";
            let bigVariableV = "";
            let bigVariableN = "";
            objNext3.forEach(x => {
                let title = x.title ? x.title : x.key
                let key = this.utilKey(x.key);

                if (x.show) {
                    if (x.value.v && x.value.k) {
                        columns = columns + `{title: "${title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${key[0]}?p.row.${key[0]}.v:null) },`
                    }
                    else if (x.value.rid && x.value.name) {
                        columns = columns + `{title: "${title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${key[0]}?p.row.${key[0]}.name:null) },`
                    } else {
                        if (x.type == "date") {
                            columns = columns + `{title: "${title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${key[0]}?p.row.${key[0]}.substring(0, 10):null) },`
                        } else {
                            columns = columns + `{title: "${title}", align: "center",width: 200, render: (h, p) => h("label", p.row.${key[0]}) },`
                        }

                    }
                }
                if (x.required) {
                    if (x.type == 'object') {
                        condition = condition + `if (!obj.${key[0]}) {this.$Message.warning('请选择${title}');return;}`;
                    } else if (x.type == "date") {
                        condition = condition + `if (!obj.${key[0]}) {this.$Message.warning('请选择${title}');return;}`;
                    } else {
                        condition = condition + `if (!obj.${key[0]}) {this.$Message.warning('请输入${title}');return;}`;
                    }
                }
                if (x.type == 'object') {
                    if (x.value.v && x.value.k) {
                        beforeEditShow = beforeEditShow + `if (obj.${key[0]}) obj.${key[0]} = this.ui.dics.${key[1]}.find(x => x.k == obj.${key[0]}.k);`
                        bigVariableV = bigVariableV + `${key[1]}:[],`;
                    }
                    if (x.value.rid && x.value.name) {
                        beforeEditShow = beforeEditShow + `if (obj.${key[0]}) obj.${key[0]} = this.ui.dics.${key[1]}.find(x => x.k == obj.${key[0]}.name);`
                        bigVariableN = bigVariableN + `${key[1]}:[],`;
                    }
                    if (x.value.names && x.value.codes) {
                        conut = conut + 1;
                        sl2 = sl2 + `regions${conut},`;
                        sl = sl + `this.ui.regions${conut} = res.data.map(x => {
                        return {
                            value: x.value,
                            label: x.label,
                            children: x.children,
                            loading: x.loading
                        };
                    });`
                    }
                }
            })
            columns = columns + `{
                    title: "操作",
                    key: "caozuo",
                    align: "center",
                    width: 360,
                    render: (h, p) => {
                        return h("div", [
                            this.$api.createColBtn(h, "md-eye", "详情", () => { this.target.detailOpen(p.row.id) }),
                            this.$api.createColBtn(h, "md-create", '编辑', () => { this.target.editOpen(p.row.id) }),
                            this.$api.createColBtn(h, "ios-archive", '删除', () => { this.target.delete(this, p.row.id, () => this.page.get()) }),
                            p.row.isEnable == true
                                ? this.$api.createColBtn(h, "md-close-circle", "禁用", () => this.target.disable(this, p.row.id, () => this.page.get()))
                                : this.$api.createColBtn(h, "md-open", "启用", () => this.target.enable(this, p.row.id, () => this.page.get())),

                        ]);
                    }
                }`
            this.scriptSetting.data.push(`ui:{${sl2}dics:{${bigVariableN}${bigVariableV}}},`);
            this.scriptSetting.data.push(`target: null, page: {},`);
            this.scriptSetting.data.push(`columns:[${columns}]`);
            this.scriptSetting.created.push(`this.target.detail.beforeShow = (obj) => {};`);
            this.scriptSetting.created.push(`this.target.add.beforeEditShow = (obj) => {${beforeEditShow}};`);
            this.scriptSetting.mounted.push(`/**name:[${bigVariableN}]  | v:[${bigVariableV}]**/this.$api.get("/StandardDictionary/Many", { keys: "" }, res => this.ui.dics = res.data);`)
            this.scriptSetting.methods.push(`save() {
            let obj = this.target.add.obj;
            ${condition}
            this.target.save(this, () => {
                 this.$Message.success('操作成功');
                this.page.get();
                this.target.cancel();
               
            });
        },`);
            // this.scriptSetting.data.push(`columns:[${columns}]`)
            //  this.scriptSetting.data.push(`columns:[${columns}]`)
            this.scriptSetting.components.push(`ConventionalLayout`)
            if (conut > 0) {
                this.scriptSetting.methods.push(`regionsLoad(item, callback) {
            item.loading = true;
            this.$api.get(
                "/Region/GetChilds",
                { parentCode: item.value },
                res => {
                    res.data.forEach(x => {
                        if (x.loading == null) delete x.loading;
                    });
                    item.children = res.data;
                    item.loading = false;
                    callback();
                },
                res => {
                    this.$Message.error(res.msg);
                    item.loading = false;
                }
            );
            }`)
                this.scriptSetting.mounted.push('this.$api.get("/Region/GetChilds", null, res => {' + sl + '})')
            }
            console.log(this.scriptSetting)
        },
        utilKey(key) {
            let keys = [];
            if (key.indexOf("(") > -1) {
                let names = [];
                let keyListCopy = JSON.stringify(key.split(/_(?![^(]*?\))/));
                JSON.parse(keyListCopy).forEach(x => {
                    names.push(JSON.stringify(x.replace("(", "").replace(")", "")))
                })
                let bigName = names[names.length - 1].replace(/"/g, "");
                let bs = bigName.charAt(0);
                let cs = bs.toUpperCase();
                let name1 = cs + bigName.slice(1);
                keys.push(names.join('.').replace(/"/g, ""))
                keys.push(name1)
            } else {
                let bs = key.charAt(0);
                let cs = bs.toUpperCase();
                let name1 = cs + key.slice(1);
                keys.push(key, name1)
            }
            return keys
        },
        objManage(str) {
            for (var name in str) {
                if (typeof str[name] == "object") {
                    this.objManage(str[name])
                }
                if (typeof str[name] == "string") {
                    str[name] = null;
                }
                if (typeof str[name] == "number") {
                    str[name] = 0;
                }
                if (typeof str[name] == "boolean") {
                    str[name] = false;
                }
            }
            return str
        }
    },
    mounted() {

    }
}
</script>
<style scoped lang="less">
.block {
    width: 100%;
    display: flex;
    .block2 {
        width: 400px;
    }
    .block3 {
        width: 400px;
    }
}
</style>
