<template>
    <div>
        <Input v-model="title" placeholder="请输入标题" />
        <Input v-model="api" placeholder="请输入api" />
        <Input v-model="obj" type="textarea" :rows="4" @on-change="change" />

        <Card style="width:300px">{{str}}</Card>
        <Card style="width:300px">{{str1}}</Card>
        <Card style="width:300px">{{str2}}</Card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: "",
            api: "",
            obj: null,
            str: ``,
            str1: `,
            `,
            str2: `
            
            `
        }
    },
    methods: {
        change() {
            let obj = JSON.parse(this.obj);
            delete obj.status;
            delete obj.msg;
            let bbb = this.aaa(obj);
            this.str2 = `importParamCreate(items) {
            return new Promise((resolve, reject) => {
                items.forEach(x => {
${bbb.str2}
                });
                var errors = items.filter(x => x.msg);
                if (errors.length > 0) reject(errors)
                else resolve(items)
            })
            },
            importSuccess() {
                this.page.get();
            },`
            this.str1 = `
             importSetting: {
                importAction: "/AssetCategory/Datas/Import",
                title: "${this.title}导入",
                fields: [
                   ${bbb.str}
                ],
                tips: [
                    '1、${bbb.str3}为必填项',
                    '2、篇幅原因,列表中显示列可能少于模板'
                ],
            }`;
            this.str = `
            <theImport
                    :fields="importSetting.fields"
                    :title="importSetting.title"
                    :tips="importSetting.tips"
                    templateUrl="/static/excels/${this.title}导入模版.xlsx"
                    :importAction="importSetting.importAction"
                    :importParamCreate="importParamCreate"
                    :importSuccess="importSuccess"
                    :width="1800"
                ></theImport>`;
        },
        aaa(obj) {
            let str = "";
            let str2 = "";
            let str3 = "";
            Object.keys(obj).forEach(x => {
                if (typeof obj[x] == "object") {
                    Object.keys(obj[x]).forEach(s => {
                        str = str + `{
                        text: "${obj[x][s]}",
                        fill: ['${s}'],
                        key: "${x}"
                       },`;
                        str2 = str2 + `if(!x.${x}.${s}) x.msg ="${obj[x][s]}为必填项";`
                        str3 = str3 + `${obj[x][s]},`;
                    })
                } else {
                    str = str + `{
                        text: "${obj[x]}",
                        key: "${x}"
                    },`;
                    str2 = str2 + `if(!x.${x}) x.msg ="${obj[x]}为必填项";`
                    str3 = str3 + `${obj[x]},`;
                }
            })
            return {
                str, str2, str3
            }
        }
    }
}
</script>