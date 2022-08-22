import { document } from "../components";

export class ComponentManagement {
    private index: number;
    private newestComponent: boolean;

    constructor(index: number, newestComponent: boolean) {
        this.index = index;
        this.newestComponent = newestComponent;
    }

    public destroy() {
        console.log(this.index);
        document.update((items) => {
            items.splice(this.index, 1);
            return items;
        });
    }

    public isNewest() {
        return this.newestComponent;
    }
}
