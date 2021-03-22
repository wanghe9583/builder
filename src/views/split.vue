<template>
    <div class="main">
        <div class="left">
            <div class="left_top">
                <Input v-model="value" @on-change="inputOnChange" type="textarea" :rows="16" />
            </div>
            <div class="left_bottom">
                <pre v-highlightjs="shiftValue"><code class="javascript"></code></pre>
            </div>
        </div>
        <div class="centre">
            <div class="list" v-if="obj">
                <Card v-for="(value, key, index) in obj" :key="index" class="item">
                    <p slot="title">{{key}}</p>
                    <p slot="extra">
                        <Tooltip content="object拆分" :delay="1000">
                            <Button
                                @click="objSplit(key)"
                                v-if="typeof value=='object'"
                                shape="circle"
                                icon="md-apps"
                                class="margin-right"
                            ></Button>
                        </Tooltip>
                        <Tooltip content="删除" :delay="1000">
                            <Button icon="ios-trash" shape="circle" @click="objDelete(key)"></Button>
                        </Tooltip>
                    </p>
                    <div v-if="typeof value=='object'">
                        <div v-for="(value2, key, index) in value" :key="index">{{key}}:{{ value2 }}</div>
                    </div>
                    <div v-else>{{ value }}</div>
                </Card>
                <div class="next" @click="next()">
                    <Button type="primary">
                        下一步
                        <Icon type="ios-arrow-forward" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: "",
            obj: null,
        }
    },
    watch: {

    },
    computed: {
        shiftValue() {
            return this.value.replace(/"/g, "")
        },
    },
    methods: {
        objDelete(key) {
            this.obj[key] = undefined;
            delete this.obj[key]
        },
        objSplit(key) {
            for (var name in this.obj) {
                if (key == name) {
                    for (var name2 in this.obj[name]) {
                        let key2 = `${name}.${name2}`
                        this.obj[key2] = this.obj[name][name2]
                    }
                    this.obj[name] = undefined;
                    delete this.obj[name]
                }
            }
        },
        inputOnChange() {
            this.obj = JSON.parse(this.value);
        },
        next() {
            this.$store.commit('setPostDto', this.obj);
            this.$store.commit('setEqualCopy', this.obj);
            this.$router.push({ name: 'dispose' })
        }
    },
    mounted() {

    }
}
</script>
<style scoped lang="less">
.main {
    display: flex;
    .left {
        width: 400px;
        .left_bottom {
            max-height: 560px;
            overflow: auto;
        }
    }
    .centre {
        margin-left: 20px;
        max-height: 900px;
        overflow: auto;
        width: 1600px;
        .list {
            display: flex;
            flex-wrap: wrap;
            .item {
                width: 350px;
                margin: 0 20px 20px 0;
            }
            .next {
                position: fixed;
                right: 20px;
                bottom: 20px;
            }
        }
    }
}
.margin-right {
    margin-right: 10px;
}
</style>
