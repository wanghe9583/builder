<template>
    <div class="main">
        <pre v-highlightjs="str"><code class="javascript"></code></pre>
    </div>
</template>
<script>
export default {
    data() {
        return {
            str: ""
        }
    },
    computed: {
        htmlObj() {
            let obj = {
                search: "",
                tools: "",
                add: "",
                detail: ""
            };
            this.$store.state.PostDto.PostDto.forEach(x => {
                obj.add = obj.add + x.module.modules.template.add;
                obj.detail = obj.detail + x.module.modules.template.detail;
            });
            return obj
        },
        jsObj() {
            let obj = {
                search: "",
                tools: "",
                add: "",
                detail: ""
            };
            this.$store.state.PostDto.PostDto.forEach(x => {

            });
            return obj
        },
        PostDtoCopy() {

            return this.$store.state.PostDto.PostDtoCopy
        }
    },
    methods: {

    },
    mounted() {
        let html = `<template>
    <div class="main">
        <ConventionalLayout>
            <div slot="search">
                ${this.htmlObj.search ? this.htmlObj.search : ""}
                <Button type="primary" icon="ios-search" @click="page.get(1)">查询</Button>
            </div>
            <div slot="tools">
                ${this.htmlObj.tools ? this.htmlObj.tools : ""}
                <Button type="success" icon="plus-circled" @click="target.addOpen('添加')">添加</Button>
            </div>
            <div slot="content">
                <div class="list">
                    <Table border :columns="columns" :data="page.list" stripe></Table>
                </div>
                <Spin fix v-show="page.loading">
                    <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
                <Page
                    class="page-top-bottom"
                    :total="page.total"
                    :page-size="page.pageSize"
                    :current="page.pageIndex"
                    @on-change="v=>page.get(v)"
                />
            </div>
        </ConventionalLayout>
        <!--添加-->
        <div>
            <Modal
                v-model="target.add.visible"
                :title="target.add.title"
                width="1000"
                :mask-closable="false"
            >
                <Form :label-width="90">
					${this.htmlObj.add ? this.htmlObj.add : ""}
                </Form>
                <div slot="footer">
                    <Button @click="target.cancel()">取消</Button>
                    <Button type="primary" @click="save()">保存</Button>
                </div>
            </Modal>
        </div>
        <!--详情-->
        <div>
            <Modal
                v-model="target.detail.visible"
                :title="target.detail.title"
                width="1000"
                :mask-closable="false"
            >
                <Form :label-width="90">
                   ${this.htmlObj.detail ? this.htmlObj.detail : ""}
                </Form>
                <div slot="footer">
                    <Button @click="target.detail.visible=false">关闭</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>`;
        let strScript = "script";
        let js = `
<${strScript}>
import ConventionalLayout from '@/components/ConventionalLayout';
import tools from '../../util/tools'
export default {
    components: {
        ConventionalLayout
    },
    data() {
        return {
            ui: {
                dics: {
                    
                }
            },
            target: null,
            page: {},
            columns: [
                
                {
                    title: "操作",
                    align: "center",
                    width: 360,
                    render: (h, p) => {
                        return h("div", [
                        this.$api.createColBtn(h, "md-eye", "详情", () => { this.target.detailOpen(p.row.id)}), 
                        this.$api.createColBtn(h, "md-create", '编辑', () => { this.target.editOpen(p.row.id)}), 
                        this.$api.createColBtn(h, "ios-archive", '删除', () => {this.target.delete(this, p.row.id, () => this.page.get())}), 
                        p.row.isEnable == true ? 
                        this.$api.createColBtn(h, "md-close-circle", "禁用", () => this.target.disable(this, p.row.id, () => this.page.get())) : 
                        this.$api.createColBtn(h, "md-open", "启用", () => this.target.enable( this, p.row.id, () => this.page.get())),]);
                    }
                }]
        }
    },
    methods: {
        save() {
            let obj = this.target.add.obj;
           
            this.target.save(this, () => {
                this.$Message.success('操作成功');
                this.page.get();
                this.target.cancel();
            });
        },
    },
    mounted() {
        this.$api.get2(this.$api.config().school, "/StandardDictionary/Many", {
            keys: ""
        }, res => {
            [] = []
        });
        this.page.get();
    },
    created() {
        let PostDto = ${this.PostDtoCopy};
        this.page = this.$api.createPage("/Building/Page");
        this.target = this.$api.createCommonLogicObj('/Building', PostDto);
        this.target.detail.beforeShow = (obj) => {
            obj = tools.assign(PostDto, obj)
        };
        this.target.add.beforeEditShow = (obj) => {

        };
    },
};
</${strScript}>
        `;
        this.str = html + js;
    }

}
</script>
<style scoped lang="less">
</style>
