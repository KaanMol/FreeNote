<script lang="ts">
    let ref: HTMLHeadingElement;

    export let state: string;

    export function focus() {
        ref.focus();
    }
</script>

<h2 bind:this={ref} contenteditable="true" bind:textContent={state}>{state}</h2>

<style lang="scss">
    h2 {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.25em;

        margin-top: 2rem;
        margin-bottom: 0.5rem;
        padding-bottom: 0.3rem;

        border-bottom: 1px solid rgba(204, 204, 204, 0.2);
    }
</style>
