<script lang="ts">
    let value = "";
    $: sketchyChecker(value);

    import { document, shortcuts } from "../../components";
    import GenericComponent from "./GenericComponent.svelte";

    function sketchyChecker(value: string) {
        shortcuts.forEach((shortcut) => {
            if (value.at(0) === shortcut.shortcut) {
                $document[$document.length - 1] = {
                    component: shortcut.component,
                    value: value.substring(
                        shortcut.shortcut.length,
                        value.length
                    ),
                };

                $document.push({
                    component: GenericComponent,
                    value: "",
                });
            }
        });
    }
</script>

<input type="text" bind:value />
