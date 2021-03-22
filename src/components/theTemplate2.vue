<template>
    <div class="main">
        <pre v-highlightjs="str"><code class="javascript"></code></pre>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props: {
        obj: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            str: ""
        }
    },
    mounted() {
        this.str = `<template>
    <div class="main">
        <ConventionalLayout>
            <div slot="search">
                ${this.obj.search ? this.obj.search : ""}
                <Button type="primary" icon="ios-search" @click="page.get(1)">查询</Button>
            </div>
            <div slot="tools">
                ${this.obj.tools ? this.obj.tools : ""}
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
					${this.obj.add ? this.obj.add : ""}
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
                   ${this.obj.detail ? this.obj.detail : ""}
                </Form>
                <div slot="footer">
                    <Button @click="target.detail.visible=false">关闭</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>`;
    }
}
</script>