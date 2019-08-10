<template>
    <mu-bottom-sheet :overlay-close="true" :open="open" @update:open="$emit('update:open',$event)">
        <mu-list @change="$emit('change',$event)">
            <mu-sub-header>选择公式</mu-sub-header>
            <mu-list-item v-for="(item,index) in value" button :value="item" :key="index">
                <mu-list-item-title>{{item.name}}</mu-list-item-title>
                <mu-list-item-action>
                    <mu-button icon color="primary" @click="$emit('delete',item)">
                        <mu-icon value="delete"></mu-icon>
                    </mu-button>
                </mu-list-item-action>
            </mu-list-item>
        </mu-list>
    </mu-bottom-sheet>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";
    import Formula from "@/domain/formula/Formula";


    @Component
    export default class FormulaBottomSheet extends Vue {
        @Prop({default: () => []})
        private value?: Formula[];
        @Prop()
        private open: boolean = false;
    }
</script>

<style scoped>

</style>
