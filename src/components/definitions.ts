import type { ComponentDefinition } from "./components";

const definitions: ComponentDefinition<any, any>[] = [];

export function registerComponent<T extends ComponentDefinition<any, any>>(definition: T) {
    definitions.push(definition);
}

export function getComponent(identifier: string): ComponentDefinition<any, any> | undefined {
    return definitions.find((definition: ComponentDefinition<any, any>) => definition.identifier === identifier);
}

export function getComponents(): ComponentDefinition<any, any>[] {
    return definitions;
}
