import type { ComponentDefinition } from "./components";

const definitions: ComponentDefinition<any>[] = [];

export function registerComponent<T extends ComponentDefinition<any>>(definition: T) {
    definitions.push(definition);
}

export function getComponent(identifier: string): ComponentDefinition<any> | undefined {
    return definitions.find((definition: ComponentDefinition<any>) => definition.identifier === identifier);
}

export function getComponents(): ComponentDefinition<any>[] {
    return definitions;
}
