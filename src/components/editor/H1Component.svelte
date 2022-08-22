<script lang="ts">
    import { onMount } from "svelte";

    import { document } from "../../components";
    export let value = "";
    // export let optionalParams;
    export let newestComponent: boolean;
    let title;
    onMount(() => {
        //alert(newestComponent === true);
    });
    if (newestComponent) {
        //alert(newestComponent);
        // title.focus();
    }

    $: sketchyChecker(value);

    function sketchyChecker(value: string) {
        if (value === "") {
            $document.
        }

        if (value.at(0) === "$") {
            console.log($document);
        }
    }
</script>

<h1
    draggable="true"
    contenteditable="true"
    bind:textContent={value}
    autofocus={newestComponent}
>
    {value} ({newestComponent})
</h1>
