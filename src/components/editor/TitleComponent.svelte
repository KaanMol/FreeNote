<script lang="ts">
    import { document } from "../../components";
    export let value = "";
    $: sketchyChecker(value);

    function sketchyChecker(value: string) {
        if (value.at(0) === "$") {
            console.log($document);
        }
    }
</script>

<h1 contenteditable="true" bind:textContent={value}>{value}</h1>
