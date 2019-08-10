<template>
    <div>
        <mu-appbar style="width: 100%" title="计算器" color="primary">
            <mu-button icon slot="right" @click="menuOpen=true">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            <mu-button icon slot="left" @click="dialogOpen=true">
                <mu-icon value="add"></mu-icon>
            </mu-button>
        </mu-appbar>
        <template v-if="selected">
            {{selected.expression}}={{result}}
            <mu-form ref="form" :model="scope">
                <mu-form-item v-for="name in selected.getVariables()" :prop="name"
                              :rules="[{validate:()=> !isNaN(scope[name]) }]" :key="name">
                    <mu-text-field :placeholder="name" :value="scope[name]" @input="compute(name,$event)"/>
                </mu-form-item>
            </mu-form>
        </template>
        <add-formula :open.sync="dialogOpen" @save="onSave" @cancel="dialogOpen=false"/>
        <formula-bottom-sheet :open.sync="menuOpen" @change="selectFormula" @delete="deleteFormula"
                              :value="formulas"></formula-bottom-sheet>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import FormulaBottomSheet from "@/components/FormulaBottomSheet.vue"
    import Formula from "@/domain/formula/Formula";
    import FormulaStore, {LocalStorageFormulaStore} from "@/domain/formula/FormulaStore";
    import AddFormula from "@/components/AddFormula.vue"
    import {Component} from "vue-property-decorator";

    const formulaStore: FormulaStore = new LocalStorageFormulaStore();

    @Component({
        components: {
            FormulaBottomSheet,
            AddFormula
        }
    })
    export default class Home extends Vue {
        private menuOpen: boolean = false;
        private dialogOpen: boolean = false;

        private formulas: Formula[] = [];
        private selected: Formula | null = null;
        private scope: any = {};
        private result: number = 0;

        private async mounted() {
            await this.loadFormulas();
        }

        private async onSave(formula: Formula) {
            await formulaStore.store(formula);
            await this.loadFormulas();
            this.dialogOpen = false;
        }

        private selectFormula(val: Formula) {
            this.selected = val;
            this.menuOpen = false;
        }

        private async deleteFormula(formual: Formula) {
            await formulaStore.remove(formual);
            await this.loadFormulas();
        }

        private async loadFormulas(): Promise<void> {
            this.formulas = await formulaStore.getAllFormula();
        }

        private compute(key: string, value: any): void {
            this.$set(this.scope, key, value);
            let form = <any>this.$refs.form;
            form.validate().then((result: boolean) => {
                if (result && this.selected) {
                    this.result = this.selected.eval(this.scope)
                }
            })
        }
    }
</script>

