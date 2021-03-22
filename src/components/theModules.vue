<template>
    <div class="main">
        <div class="typeModules">
            <RadioGroup v-model="disabledGroup">
                <Radio label="Select"></Radio>
                <Radio label="Cascader"></Radio>
            </RadioGroup>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        typeModules: {
            type: String,
            default: null
        }
    }
}
</script>