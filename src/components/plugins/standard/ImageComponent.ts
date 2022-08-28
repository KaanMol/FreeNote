import { ComponentDefinition, ComponentInformation, ShorthandDefinition } from "../../components";
import ImageComponent from "./ImageComponent.svelte";

export class ImageComponentDefinition extends ComponentDefinition<ImageComponent, String> {
    identifier = "freenote.image";

    componentType = ImageComponent;

    information = new ComponentInformation("Image", "Add an image to your document");
    shorthand = new ShorthandDefinition("image", "img");

    defaultState = "";

    serialize(state: string): string {
        return state;
    }

    deserialize(serialized: string): string {
        return serialized;
    }
}
