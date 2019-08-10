<template>
    <mu-dialog v-if="open" transition="slide-bottom" fullscreen :open="open" @update:open="$emit('update:open',$event)">
        <mu-appbar color="primary" title="添加公式">
            <mu-button slot="left" flat @click="$emit('cancel')">
                取消
            </mu-button>
            <mu-button slot="right" flat @click="save">
                保存
            </mu-button>
        </mu-appbar>
        <mu-text-field v-model="name" placeholder="名称"></mu-text-field>
        <mu-text-field v-model="expression" :rows="9" :error-text="error" multi-line full-width/>
    </mu-dialog>
</template>

<script lang="ts">
    import Vue from 'vue';
    import FormulaStore, {LocalStorageFormulaStore} from "@/domain/formula/FormulaStore";
    import Formula from "@/domain/formula/Formula";
    import {Prop} from "vue-property-decorator";
    import Component from "vue-class-component";


    @Component
    export default class AddFormula extends Vue {
        @Prop()
        open: boolean = false;

        private expression: string = "";
        private name: string = "";
        private error: string = "";

        private save(): void {
            try {
                if (!name) {
                    this.name = this.expression;
                }
                let formula = new Formula(this.name, this.expression);
                this.$emit("save", formula);
            } catch (e) {
                this.error = e.message
            }
        }
    }
</script>
