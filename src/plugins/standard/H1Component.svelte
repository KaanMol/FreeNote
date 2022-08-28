<script lang="ts">
    let ref: HTMLHeadingElement;
    export let state: string;

    export function focus() {
        ref.focus();
    }
</script>

<h1 bind:this={ref} contenteditable="true" bind:textContent={state}>{state}</h1>
