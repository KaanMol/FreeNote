import { ComponentDefinition, ComponentInformation, ShorthandDefinition } from "../../components";
import CheckboxComponent from "./CheckboxComponent.svelte";

export class CheckboxComponentDefinition extends ComponentDefinition<Boolean> {
    identifier = "freenote.checkbox";

    componentType = CheckboxComponent;

    information = new ComponentInformation("Checkbox", "Add a checkbox to your document");
    shorthand = new ShorthandDefinition("checkbox", "c");

    defaultState = false;

    serialize(state: boolean): string {
        return state.toString();
    }

    deserialize(serialized: string): boolean {
        return serialized === "true";
    }
}
