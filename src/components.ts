import { writable } from "svelte/store";
import GenericComponent from "./components/editor/GenericComponent.svelte";
import H1Component from "./components/editor/H1Component.svelte";
import ImageComponent from "./components/editor/ImageComponent.svelte";

interface CommandConfig<T> {
    command: string;
    shortcut?: string;
    component: T;
    description: string;
    name: string;
}
class Command<T> {
    private config: CommandConfig<T>;

    constructor(config: CommandConfig<T>) {
        this.config = config;
    }

    get shortcut() {
        return this.config.shortcut;
    }

    get command() {
        return this.config.command;
    }

    get component() {
        return this.config.component;
    }

    get name() {
        return this.config.name;
    }

    get description() {
        return this.config.description;
    }
}
class TitleCommand extends Command<typeof H1Component> {
    constructor() {
        super({
            command: "h1",
            shortcut: "#",
            component: H1Component,
            name: "Title",
            description: "Add a title to your document",
        });
    }
}

class ImageCommand extends Command<typeof ImageComponent> {
    constructor() {
        super({
            command: "image",
            component: ImageComponent,
            name: "Image",
            description: "Embed an image in your document",
        });
    }
}

export const commands = [new TitleCommand(), new ImageCommand()];

export const document = writable([
    {
        component: H1Component,
        value: "Hello World",
        createdAt: Date.now()
    },
    {
        component: GenericComponent,
        value: "",
        createdAt: Date.now()
    },
]);
