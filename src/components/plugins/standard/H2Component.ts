import { ComponentDefinition, ComponentInformation, ShorthandDefinition } from "../../components";
import H2Component from "./H2Component.svelte";

export class H2ComponentDefinition extends ComponentDefinition<String> {
    identifier = "spanner.h2";
    defaultState = "";
    componentType = H2Component;

    information = new ComponentInformation("Heading 2", "Add a Heading 2 to your document");
    shorthand = new ShorthandDefinition("h2", "##");

    serialize(state: string): string {
        return state;
    }

    deserialize(serialized: string): string {
        return serialized;
    }
}
