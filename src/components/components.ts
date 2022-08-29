export class ComponentInstance<TState> {
    constructor(public readonly definition: ComponentDefinition<TState>, public readonly state: TState) {}
}

export abstract class ComponentDefinition<TState> {
    abstract readonly identifier: string;

    abstract readonly information: ComponentInformation;
    abstract readonly shorthand: ShorthandDefinition;

    abstract readonly componentType: any;
    abstract readonly defaultState: TState;

    abstract serialize(state: TState): string;
    abstract deserialize(serialized: string): TState;
}

export class ComponentInformation {
    constructor(public readonly name: string, public readonly description: string) {}
}

export class ShorthandDefinition {
    constructor(public readonly command: string, public readonly shortcut: string) {}
}
