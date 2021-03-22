<template>
    <div class="theScipt">
        <label v-text="`<script>`"></label>
        <!-- import -->
        <slot name="import"></slot>
        <label v-text="`import ConventionalLayout from '@/components/ConventionalLayout';`"></label>
        <!-- components -->
        <label v-text="`export default {`"></label>
        <label v-text="`components: {`"></label>
        <slot name="components"></slot>
        <label v-text="`},`"></label>
        <!-- data -->
        <label v-text="`data() {return {`"></label>
        <slot name="data"></slot>
        <label v-text="`}},`"></label>
        <!-- methods -->
        <label v-text="`methods: {`"></label>
        <slot name="methods"></slot>
        <label v-text="`},`"></label>
        <!-- mounted -->
        <label v-text="`mounted(){`"></label>
        <slot name="mounted"></slot>
        <label v-text="`},`"></label>
        <!-- created -->
        <label v-text="`created() {`"></label>
        <slot name="created"></slot>
        <label v-text="`},`"></label>
        <!--  -->
        <label v-text="`};`"></label>
        <label v-text="`</script>`"></label>
    </div>
</template>