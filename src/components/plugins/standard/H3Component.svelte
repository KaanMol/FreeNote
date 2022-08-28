<script lang="ts">
    let ref: HTMLHeadingElement;

    export let state: string;

    export function focus() {
        ref.focus();
    }
</script>

<h3 bind:this={ref} contenteditable="true" bind:textContent={state}>{state}</h3>

<style lang="scss">
    h3 {
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.25em;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }
</style>
