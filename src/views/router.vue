<template>
    <div class="main">
        <div class="left">
            <Input v-model="value" class="textarea" type="text" />
            <Input
                v-model="valueChilren"
                class="textarea"
                @on-change="onChangeChilren"
                type="textarea"
                :rows="16"
            />
            <div class="buttom">
                <Button
                    type="primary"
                    v-clipboard:copy="str"
                    v-clipboard:success="copy"
                    v-clipboard:error="onError"
                >复制</Button>
            </div>
        </div>
        <div class="centre">
            <pre v-highlightjs="str"><code class="javascript"></code></pre>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: "",
            valueChilren: "",
            str: ""
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        copy() {
            this.$Message.success('复制成功')
        },
        onChangeChilren() {
            let strArray = this.valueChilren.replace(/\s*/g, "").split(".vue");
            strArray.forEach(x => {
                this.str = this.str + ` 
                {
                  path: '${x}',
                  component: resolve => require(['@/views/${this.value}/${x}.vue'], resolve)
                },`
            })
        }
    },
    mounted() {
        let str = "";
        ['ConventionalLayout.vue',
            'selectClass.vue',
            'selectClasses.vue',
            'selectStudents.vue',
            'selectTeacher.vue',
            'selectTeachers.vue',
            'theExport',
            'theImport.vue',
            'uploadAvatar.vue',
            'uploadFile.vue',
            'uploadImage.vue'].forEach(x => {

                str = str +
                    `
${x.replace(".vue", "")},
`
            })
        console.log(str)
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
