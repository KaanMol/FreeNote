import { ComponentDefinition, ComponentInformation, ShorthandDefinition } from "../../components";
import CodeComponent from "./CodeComponent.svelte";

export class CodeComponentState {
    constructor(public code: string, public language: string) {}
}

export class CodeComponentDefinition extends ComponentDefinition<CodeComponentState> {
    identifier = "spanner.code";
    defaultState = { code: "console.log('Hello world!');", language: "js" };
    componentType = CodeComponent;

    information = new ComponentInformation("Code", "Add a coding block to your document");
    shorthand = new ShorthandDefinition("code", "`");

    serialize(state: CodeComponentState): string {
        return JSON.stringify(state);
    }

    deserialize(serialized: string): CodeComponentState {
        return JSON.parse(serialized) as CodeComponentState;
    }
}
