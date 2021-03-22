<template>
    <div class="main">
        <div class="left">
            <Timeline>
                <TimelineItem v-for="(item,index) in x_pageObj.PostDto" :key="index">
                    <p class="time">{{item.key}}</p>
                </TimelineItem>
            </Timeline>
        </div>
        <div class="right">
            <Card v-for="(item,index) in x_pageObj.PostDto" :key="index" class="item">
                <Form :label-width="80">
                    <FormItem label="标题">
                        <Input v-model="item.title" placeholder="输入标题" style="width:400px" />
                    </FormItem>
                    <FormItem label="key">
                        <label>{{item.key}}</label>
                    </FormItem>
                    <FormItem label="value">
                        <pre v-highlightjs="item.value"><code class="javascript"></code></pre>
                    </FormItem>
                    <FormItem label="其他配置">
                        <Checkbox v-model="item.show">显示列表上</Checkbox>
                        <Checkbox v-model="item.required">必填项</Checkbox>
                    </FormItem>
                    <FormItem label="选择组件">
                        <RadioGroup v-model="item.moduleName">
                            <Radio :label="item.k" v-for="item in modulesName" :key="item.k"></Radio>
                        </RadioGroup>
                        <union :obj="item"></union>
                    </FormItem>
                </Form>
            </Card>
            <div class="next" @click="next()">
                <Button type="primary">
                    下一步
                    <Icon type="ios-arrow-forward" />
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
import unionjs from '../modules/union/union.js'
import union from '../modules/union/union.vue'
export default {
    components: {
        union
    },
    data() {
        return {
            axis: null,
            modulesName: unionjs.modulesName
        }
    },
    computed: {
        x_pageObj() {
            this.$store.state.PostDto.PostDto.forEach(x => {
                x.moduleName = unionjs.typeProcessing(x.type);
            });
            return this.$store.state.PostDto;
        },
    },
    methods: {
        next() {
            this.$router.push({ name: 'code' })
            this.$store.commit('setEqual', this.x_pageObj.PostDto);
        }
    },
    mounted() {
    }
}
</script>
<style scoped lang="less">
@deep: ~">>>";
@{deep}{
  .ivu-timeline-item-content {
    color: #e06c75;
}  
.ivu-timeline-item-head-blue {
    border-color: #98c379;
    color: #2d8cf0;
}
}

.main {
    display: flex;
    .left {
        width: 400px;
        background: #282c34;
        max-height: 900px;
        padding: 20px;
        overflow: auto;
    }
    .right{
       width: 1400px;
       margin: 0 50px;
    max-height: 900px;
    overflow: auto; 
    .item{
        margin: 50px 0;
    }
      .next {
                position: fixed;
                right: 20px;
                bottom: 20px;
            }
    }
}
</style>