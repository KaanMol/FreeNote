import { writable, get } from "svelte/store";

import GenericComponent from "./components/editor/GenericComponent.svelte";
import H1Component from "./components/editor/H1Component.svelte";
import H2Component from "./components/editor/H2Component.svelte";
import H3Component from "./components/editor/H3Component.svelte";
import Kanban from "./components/editor/Kanban.svelte";
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

    public getDefaultValue(value: string) {
        return value.substring(this.command.length + 1, value.length);
    }
}
class KanboenComponent extends Command<typeof Kanban> {
    constructor() {
        super({
            command: "kanban",
            shortcut: "kb",
            component: Kanban,
            name: "Kanban board",
            description: "Add a Kanban to your document",
        });
    }
}

class H1Command extends Command<typeof H1Component> {
    constructor() {
        super({
            command: "h1",
            shortcut: "#",
            component: H1Component,
            name: "Heading 1",
            description: "Add a Heading 1 to your document",
        });
    }
}

class H2Command extends Command<typeof H2Component> {
    constructor() {
        super({
            command: "h2",
            shortcut: "##",
            component: H2Component,
            name: "Heading 2",
            description: "Add a Heading 2 to your document",
        });
    }
}

class H3Command extends Command<typeof H3Component> {
    constructor() {
        super({
            command: "h3",
            shortcut: "###",
            component: H3Component,
            name: "Heading 3",
            description: "Add a heading 3 to your document",
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

export const commands = [
    new H1Command(),
    new H2Command(),
    new H3Command(),
    new ImageCommand(),
    new KanboenComponent(),
];

export const document = writable([
    {
        id: 1,
        component: H1Component,
        value: "Hello World",
        createdAt: Date.now(),
    },
    {
        id: 2,
        component: GenericComponent,
        value: "bs",
        createdAt: Date.now(),
    },
]);

export const lastId = writable(2);

export function serialize() {
    return JSON.stringify(get(document));
}
