<template>
    <div class="main">
        <span>
            <label v-text="'<'+'template'+'>'"></label>
            <script type="text/html" style="display:block">
  <div class="main">
      <ConventionalLayout>
            </script>
            <!-- 查询区域 -->
            <script type="text/html" style="display:block">
  <div slot="search">
            </script>
        </span>
        <slot name="search"></slot>
        <span>
            <script type="text/html" style="display:block">
  <Button type="primary" icon="ios-search" @click="page.get(1)">查询</Button>
             </div>
            </script>
            <!-- 查询区域 -->
            <!-- 功能区域 -->
            <script type="text/html" style="display:block">
  <div slot="tools">
            </script>
        </span>
        <slot name="tools"></slot>
        <span>
            <script type="text/html" style="display:block">
  <Button
                      type="success"
                      icon="ios-add"
                      @click="target.addOpen('添加')"
                  >添加</Button>
               </div>
               <div slot="content">
                <div class="list">
                    <Table
                        border
                        :columns="columns"
                        :data="page.list"
                        :total="page.total"
                        @on-selection-change="selectChange"
                        @on-cell-click="tableCellClick"
                        stripe
                    ></Table>
                </div>
                <Spin fix v-show="page.loading">
                    <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
                <Page
                    class="page-top-bottom"
                    show-total
                    :total="page.total"
                    :page-size="page.pageSize"
                    :current="page.pageIndex"
                    @on-change="v=>page.get(v)"
                />
            </div>
            </script>
            <!-- 功能区域 -->
            <!-- 查询区域 -->
        </span>
        <span>
            <!-- 查询区域 -->
            <script type="text/html" style="display:block">
  </ConventionalLayout>
            </script>
            <!-- 添加区域 -->
            <script type="text/html" style="display:block">
        <div>
  <Modal
            v-model="target.add.visible"
            :title="target.add.title"
            class="modal-box"
            :mask-closable="false"
        >
        <Form :label-width="90">
            </script>
            <slot name="modalAdd"></slot>
            <script type="text/html" style="display:block">
         </Form>
  <div slot="footer">
                 <Button @click="target.cancel()">取消</Button>
                 <Button type="primary" @click="save()">保存</Button>
             </div>
         </Modal>
         </div>
            </script>
            <!-- 添加区域 -->
            <!-- 详情区域 -->
            <script type="text/html" style="display:block">
        <div>
  <Modal
            v-model="target.detail.visible"
            :title="target.detail.title"
            class="modal-box"
            :mask-closable="false"
        >
        <Form :label-width="90">
            </script>
            <slot name="modalDetail"></slot>
            <script type="text/html" style="display:block">
         </Form>
  <div slot="footer">
                <Button @click="target.detail.visible=false">关闭</Button>
             </div>
         </Modal>
         </div>
            </script>
            <script type="text/html" style="display:block">
  </div>
            </script>
            <!-- 详情区域 -->
            <label v-text="'<'+'/template'+'>'"></label>
        </span>
    </div>
</template>