import Formula from "@/domain/formula/Formula";

export class LocalStorageFormulaStore implements FormulaStore {
    async getAllFormula(): Promise<Formula[]> {
        let item = localStorage.getItem("formulas");
        if (item) {
            return JSON.parse(item).map((item: any) => {
                return new Formula(item.name, item.expression);
            });
        } else {
            return []
        }
    }

    async store(formula: Formula): Promise<void> {
        let formulas = LocalStorageFormulaStore.readData();
        formulas.push(formula);
        localStorage.setItem("formulas", JSON.stringify(formulas.map((item => {
            return {name: item.name, expression: item.expression}
        }))));
    }

    async remove(formula: Formula): Promise<void> {
        let formulas = LocalStorageFormulaStore.readData();
        formulas.forEach((item, index) => {
            if (item.name === formula.name) {
                delete formulas[index];
            }
        });
        formulas = formulas.filter((item) => {
            return !!item;
        });
        localStorage.setItem("formulas", JSON.stringify(formulas));
    }

    private static readData(): Formula[] {
        let item = localStorage.getItem("formulas");
        let formulas: Formula[];
        if (item) {
            formulas = JSON.parse(item)
        } else {
            formulas = [];
        }
        return formulas;
    }
}

export default interface FormulaStore {
    getAllFormula(): Promise<Formula[]>

    store(formula: Formula): Promise<void>

    remove(formula: Formula): Promise<void>
}
