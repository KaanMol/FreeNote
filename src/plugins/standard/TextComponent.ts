import { ComponentDefinition, ComponentInformation, ShorthandDefinition } from "../../components/components";
import type TextComponent from "./TextComponent.svelte";

export class TextComponentDefinition extends ComponentDefinition<TextComponent, String> {
    identifier = "freenote.text";
    information = new ComponentInformation("Text", "Add text to your note");
    shorthand = new ShorthandDefinition("p", "");

    componentType: TextComponent;

    defaultState = "";

    serialize(state: string): string {
        return state;
    }

    deserialize(serialized: string): string {
        return serialized;
    }
}
