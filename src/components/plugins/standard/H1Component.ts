import { ComponentDefinition, ComponentInformation, ShorthandDefinition } from "../../components";
import H1Component from "./H1Component.svelte";

export class H1ComponentDefinition extends ComponentDefinition<H1Component, String> {
    identifier = "freenote.h1";
    defaultState = "";
    componentType = H1Component;

    information = new ComponentInformation("Heading 1", "Add a Heading 1 to your document");
    shorthand = new ShorthandDefinition("h1", "#");

    serialize(state: string): string {
        return state;
    }

    deserialize(serialized: string): string {
        return serialized;
    }
}
