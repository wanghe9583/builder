<template>
    <div class="mian">
        <InputNumberThe :obj="model" v-if="this.obj.moduleName=='InputNumberThe'"></InputNumberThe>
        <inputString :obj="model" v-if="this.obj.moduleName=='inputString'"></inputString>
        <selectKV :obj="model" v-if="this.obj.moduleName=='selectKV'"></selectKV>
        <datePickerDate :obj="model" v-if="this.obj.moduleName=='datePickerDate'"></datePickerDate>
        <switchBoolean :obj="model" v-if="this.obj.moduleName=='switchBoolean'"></switchBoolean>
        <cascaderStrCodesNames :obj="model" v-if="this.obj.moduleName=='cascaderStrCodesNames'"></cascaderStrCodesNames>
    </div>
</template>
<script>
import inputString from '../input/inputString'
import InputNumberThe from '../input/InputNumberThe'
import selectKV from '../select/selectKV'
import datePickerDate from '../datePicker/datePickerDate'
import switchBoolean from '../switch/switchBoolean'
import cascaderStrCodesNames from '../cascader/cascaderStrCodesNames'

export default {
    components: { inputString, selectKV, InputNumberThe, datePickerDate, switchBoolean, cascaderStrCodesNames },
    props: {
        obj: {
            type: Object,
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
        }
    },
}
</script>
<style scoped lang="less">
</style>