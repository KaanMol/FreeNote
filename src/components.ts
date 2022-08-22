import { writable } from "svelte/store";
import GenericComponent from "./components/editor/GenericComponent.svelte";
import TextComponent from "./components/editor/TextComponent.svelte";
import TitleComponent from "./components/editor/TitleComponent.svelte";

export const shortcuts = [
    { shortcut: " ", component: TextComponent },
    { shortcut: "#", component: TitleComponent },
];

export const document = writable([
    {
        component: TitleComponent,
        value: "Hello World",
    },
    {
        component: GenericComponent,
        value: "",
    },
]);
