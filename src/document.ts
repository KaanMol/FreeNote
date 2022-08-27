import { writable, type Writable, get } from "svelte/store";
import { ComponentDefinition, ComponentInstance } from "./components/components";
import { getComponent } from "./components/definitions";

export const document: Writable<ComponentInstance<any, any>[]> = writable([]); // todo: replace any with a Svelte component base type

export function clearDocument() {
    document.set([]);
}

export function getDocument(): ComponentInstance<any, any>[] {
    return get(document);
}

export function insertInDocument<TComponent, TState>(definition: ComponentDefinition<TComponent, TState>, state: TState): void {
    if (getComponent(definition.identifier) === undefined) {
        console.warn(`Inserting a component that is not registered: ${definition.componentType.name} (${definition.identifier}). Did you forget to register it? Serializing will fail.`);
    }

    document.update((doc) => {
        return [...doc, new ComponentInstance(definition, state)];
    });
}

export function serializeDocument(): string {
    const save = [];

    getDocument().forEach((component) => {
        let identifier = component.definition.identifier;
        let serializedState = component.definition.serialize(component.state);

        save.push({
            identifier: identifier,
            state: serializedState,
        });
    });

    return JSON.stringify(save);
}

export function deserializeDocument(data: string) {
    clearDocument();

    let save = JSON.parse(data);

    for (let i = 0; i < save.length; i++) {
        let identifier = save[i]["identifier"];
        let serializedState = save[i]["state"];

        let definition = getComponent(identifier);

        if (definition === undefined) {
            console.warn(`Could not find definition for identifier ${identifier}`);
            continue;
        }

        let state = definition.deserialize(serializedState);

        insertInDocument(definition, state);
    }
}
