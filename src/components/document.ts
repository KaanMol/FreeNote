import { tick } from "svelte";
import { writable, type Writable, get } from "svelte/store";
import { ComponentDefinition, ComponentInstance } from "./components";
import { getComponent } from "./definitions";

export const document: Writable<ComponentInstance<any, any>[]> = writable([]); // todo: replace any with a Svelte component base type
export const documentRef: any[] = [];

export function clearDocument() {
    document.set([]);
}

export function getDocument(): ComponentInstance<any, any>[] {
    return get(document);
}

export async function insertInDocument<TComponent, TState>(definition: ComponentDefinition<TComponent, TState>, state: TState = undefined): Promise<void> {
    if (getComponent(definition.identifier) === undefined) {
        console.warn(`Inserting a component that is not registered: ${definition.componentType.name} (${definition.identifier}). Did you forget to register it? Serializing will fail.`);
    }

    if (state === undefined) {
        state = definition.defaultState;
    }

    document.update((doc) => {
        return [...doc, new ComponentInstance(definition, state)];
    });

    if (documentRef.length > 0) {
        await tick();
        documentRef[documentRef.length - 1].focus();
    }
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
            // todo: popup error message: "Some components could not be loaded."
            continue;
        }

        let state = definition.deserialize(serializedState);

        insertInDocument(definition, state);
    }
}
