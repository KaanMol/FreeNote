<script lang="ts">
    let ref: HTMLParagraphElement;

    export let state: string;

    export function focus() {
        ref.focus();
    }
</script>

<p bind:this={ref} contenteditable="true" bind:textContent={state}>{state}</p>

<style lang="scss">
    p {
        line-height: 1.5em;
        margin: 0;
    }
</style>
