import {MathNode, parse} from "mathjs";

export default class Formula {
    private mathNode: MathNode;

    constructor(public name: string, public expression: string) {
        this.mathNode = parse(expression);
    }

    toTex(): string {
        return this.mathNode.toTex();
    }

    getVariables(): (string | undefined)[] {
        let variables = this.mathNode.filter((node, path, parent) => {
            return node.isSymbolNode;
        }).map(item => item.name);
        let set = new Set(variables);
        return Array.from(set);
    }

    eval(scope: any): number {
        return this.mathNode.compile().evaluate(scope);
    }
}
