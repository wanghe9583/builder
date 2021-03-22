<template>
    <div>
        <draggable @start="start" @end="end" class="box">
            <Card class="item" v-for="d in 15" :key="d">{{d}}</Card>
        </draggable>
    </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable
    },
    data() {
        return {
            list: [
                { name: "1", id: 1 },
                { name: "2", id: 2 },
                { name: "3", id: 3 },
                { name: "4", id: 4 },
                { name: "5", id: 5 },
                { name: "6", id: 6 },
                { name: "7", id: 7 },
                { name: "8", id: 8 },
            ]
        }
    },
    methods: {
        start(e) {
            console.log(e)
        },
        end(e) {
            console.log(e)
        },
    }
}
</script>
<style scoped lang="less">
.box {
    display: flex;
    flex-wrap: wrap;
    .item {
        width: 200px;
    }
}
</style>